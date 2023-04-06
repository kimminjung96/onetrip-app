import { API_URL } from "./config/constans";
import axios from "axios";
import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { Image, SafeAreaView, StyleSheet, Text, View, ScrollView } from "react-native";

export default function App() {
  const [product, setProduct] = useState([]);
  const [review, setReview] = useState([]);

  useEffect(() => {
    axios
      .get(`${API_URL}/product`)
      .then((result) => {
        setProduct(result.data.product);
      })
      .catch((error) => console.log(error));
    axios
      .get(`${API_URL}/review`)
      .then((result) => {
        console.log(result);
        setReview(result.data.review);
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <View style={styles.container}>
      <SafeAreaView>
        <StatusBar style="auto" />
        <View style={styles.header}></View>
        <ScrollView style={styles.wrap}>
          <View style={styles.main}></View>
          <View style={styles.products}>
            <Text>원트립 패키지</Text>
            {product &&
              product.map((data, idx) => {
                console.log(`${API_URL}/${data.imageUrl}`, "skdfhsldf;s");
                return (
                  <View key={data.id} style={styles.productCard}>
                    <Image source={{ uri: `${API_URL}/${data.imageUrl}` }} style={styles.productImage} />
                    <View style={styles.packageText}>
                      <Text style={styles.productCountry}>{data.p_country}</Text>
                      <Text style={styles.productTitle}>&#91;{data.p_name}&#93;</Text>
                      <Text style={styles.productPrice}>{data.price} 원</Text>
                    </View>
                  </View>
                );
              })}
          </View>
          <View style={styles.review}>
            {review &&
              review.map((data, idx) => {
                <View style={styles.reviewWrap}></View>;
              })}
          </View>
          <View style={styles.footer}></View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  productCard: {
    width: 360,
    borderColor: "rgb(230,230,230)",
    borderWidth: 1,
    borderRadius: 16,
    backgroundColor: "#fff",
    overflow: "hidden",
    marginBottom: 16,
  },
  productImage: {
    width: "100%",
    height: 210,
  },
  packageText: {
    padding: 16,
  },
});
