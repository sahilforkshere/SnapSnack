import { Image, StyleSheet, Text, TextInput, View, Alert } from "react-native";
import React, { useState, useEffect } from "react";
import Button from "@/components/Button";
import { defaultPizzaImage } from "@/components/ProductListItem";
import * as ImagePicker from "expo-image-picker";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import { useInsertProduct, useUpdateProduct, useProduct } from "@/api/products";

const CreateProduct = () => {
  const { id: idString } = useLocalSearchParams();
  const id = idString ? parseFloat(Array.isArray(idString) ? idString[0] : idString) : undefined;
  const isUpdating = !!id;

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState<string | null>(null);
  const [errors, setErrors] = useState("");
  const router = useRouter();

  const { mutate: insertProduct, isPending } = useInsertProduct();
  const { mutate: updateProduct } = useUpdateProduct();
  const { data: existingProduct } = useProduct(id || 0, { enabled: isUpdating });

  // Pre-fill form on edit
  useEffect(() => {
    if (existingProduct) {
      setName(existingProduct.name);
      setPrice(existingProduct.price.toString());
      setImage(existingProduct.image);
    }
  }, [existingProduct]);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const resetFields = () => {
    setName("");
    setPrice("");
    setImage(null);
  };

  const validateInput = () => {
    setErrors("");

    if (!name) {
      setErrors("Name is required");
      return false;
    }

    if (!price) {
      setErrors("Price is required");
      return false;
    }

    const parsedPrice = parseFloat(price);
    if (isNaN(parsedPrice)) {
      setErrors("Price must be a number");
      return false;
    }

    return true;
  };

  const onCreate = () => {
    if (!validateInput()) return;

    insertProduct(
      { name, price: parseFloat(price), image },
      {
        onSuccess: () => {
          Alert.alert("Success", "Product created successfully!");
          resetFields();
          router.replace("/(admin)/menu");
        },
        onError: (err: any) => {
          Alert.alert("Error", err.message);
        },
      }
    );
  };

  const onUpdate = () => {
    if (!validateInput()) return;

    updateProduct(
      { id, name, price: parseFloat(price), image },
      {
        onSuccess: () => {
          Alert.alert("Success", "Product updated successfully!");
          router.back();
        },
        onError: (err: any) => {
          Alert.alert("Error", err.message);
        },
      }
    );
  };

  const onSubmit = () => {
    if (isUpdating) {
      onUpdate();
    } else {
      onCreate();
    }
  };

  const confirmDelete = () => {
    Alert.alert("Confirm", "Are you sure you want to delete this product?", [
      { text: "Cancel" },
      {
        text: "Confirm",
        style: "destructive",
        onPress: () => {
          Alert.alert("Delete not implemented yet");
        },
      },
    ]);
  };

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          title: isUpdating ? "Update Product" : "Create Product",
        }}
      />
      <Image
        source={{ uri: image || defaultPizzaImage }}
        style={styles.image}
      />
      <Text style={styles.textButton} onPress={pickImage}>
        Select Image
      </Text>

      <Text style={styles.label}>Name</Text>
      <TextInput
        value={name}
        onChangeText={setName}
        placeholder="Pizza name"
        style={styles.input}
      />

      <Text style={styles.label}>Price ($)</Text>
      <TextInput
        value={price}
        onChangeText={setPrice}
        placeholder="9.99"
        style={styles.input}
        keyboardType="numeric"
      />

      <Text style={{ color: "red", marginBottom: 10 }}>{errors}</Text>

      <Button
        onPress={onSubmit}
        text={isPending ? "Saving..." : isUpdating ? "Update" : "Create"}
      />

      {isUpdating && (
        <Text onPress={confirmDelete} style={styles.dltbtn}>
          Delete
        </Text>
      )}
    </View>
  );
};

export default CreateProduct;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 10,
  },
  label: {
    color: "gray",
    fontSize: 16,
  },
  input: {
    backgroundColor: "white",
    padding: 10,
    borderRadius: 5,
    marginTop: 5,
    marginBottom: 20,
  },
  image: {
    width: "50%",
    aspectRatio: 1,
    alignSelf: "center",
    borderRadius: 10,
  },
  textButton: {
    alignSelf: "center",
    fontWeight: "bold",
    marginVertical: 10,
    color: "blue",
  },
  dltbtn: {
    alignSelf: "center",
    color: "red",
    marginTop: 20,
    fontWeight: "bold",
  },
});
