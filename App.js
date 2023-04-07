import { API_URL } from "./config/constans";
import axios from "axios";
import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { Image, SafeAreaView, StyleSheet, Text, View, ScrollView, Dimensions, TouchableOpacity, Alert } from "react-native";
import Carousel from "react-native-reanimated-carousel";
import dayjs from "dayjs";
import { block } from "react-native-reanimated";

export default function App() {
  const [product, setProduct] = useState([]);
  const [products, setProducts] = useState([]);
  const [review, setReview] = useState([]);

  const width = Dimensions.get("window").width;
  const COUNT = 2;

  useEffect(() => {
    axios
      .get(`${API_URL}/products`)
      .then((result) => {
        setProducts(result.data.product);
      })
      .catch((error) => console.log(error));
    axios
      .get(`${API_URL}/product`)
      .then((result) => {
        setProduct(result.data.product);
      })
      .catch((error) => console.log(error));
    axios
      .get(`${API_URL}/review`)
      .then((result) => {
        setReview(result.data.review);
      })
      .catch((error) => console.log(error));
  }, []);

  const baseOptions = {
    width: width / COUNT,
    height: 360,
    style: {
      width: width,
    },
  };

  return (
    <SafeAreaView>
      <StatusBar style="auto" />
      <ScrollView style={styles.wrap}>
        <View style={styles.container}>
          <View style={styles.header}></View>
          <View style={styles.main}></View>
          <View style={styles.products}>
            <Text style={styles.productsTitle}>원트립 패키지</Text>
            <View style={styles.productswrap}>
              <TouchableOpacity
                onPress={() => {
                  Alert.alert("클릭");
                }}
              >
                <Carousel
                  {...baseOptions}
                  loop
                  scrollAnimationDuration={2000}
                  autoPlay={true}
                  sliderWidth={width}
                  data={products}
                  renderItem={(data) => {
                    return (
                      <View key={data.item.id} /* style={styles.productCard} */>
                        <Image source={{ uri: `${API_URL}/${data.item.imageUrl}` }} style={styles.productImg} />
                        <View style={styles.packageText}>
                          <Text style={styles.productCountry}>{data.item.p_country}</Text>
                          <Text style={styles.productname}>&#91;{data.item.p_name}&#93;</Text>
                          <Text style={styles.productPrice}>{data.item.price} 원</Text>
                        </View>
                      </View>
                    );
                  }}
                />
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.review}>
            <Text style={styles.productsTitle}>원트립 최신상품</Text>
            {product &&
              product.map((data) => {
                return (
                  <View key={data.id} style={styles.productCard}>
                    <Image source={{ uri: `${API_URL}/${data.imageUrl}` }} style={styles.productImg} />
                    <View style={styles.packageText}>
                      <Text style={styles.productCountry}>{data.p_country}</Text>
                      <Text style={styles.productname}>&#91;{data.p_name}&#93;</Text>
                      <Text style={styles.productPrice}>{data.price} 원</Text>
                    </View>
                  </View>
                );
              })}
          </View>
          <View style={styles.review}>
            <Text style={styles.productsTitle}>원트립 후기</Text>
            {review &&
              review.map((data) => {
                return (
                  <View key={data.id} style={styles.reviewWrap}>
                    <Image source={{ uri: `${API_URL}/${data.r_imageUrl}` }} style={styles.reviewImg} />
                    <View style={styles.reviewMark}>
                      <Text style={styles.reviewArea}>{data.r_area}</Text>
                      <Text style={styles.reviewTitle}>{data.r_title}</Text>
                      <Text style={styles.reviewText}>{data.r_text}</Text>
                      <Text style={styles.reviewName}>{data.user_name}</Text>
                    </View>
                    <View style={styles.reviewInfo}>
                      <Text style={styles.reviewDayY}>{dayjs(data.createdAt).format("YYYY")}</Text>
                      <Text style={styles.reviewDayM}>{dayjs(data.createdAt).format("MM")}월</Text>
                    </View>
                  </View>
                );
              })}
          </View>
          <View style={styles.footer}></View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  productswrap: {
    // flexDirection: "row",
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
  productImg: {
    width: "100%",
    height: 210,
  },
  packageText: {
    padding: 16,
  },
  reviewWrap: {
    borderRadius: 16,
    height: 360,
    overflow: "hidden",
    position: "relative",
  },
  reviewImg: {
    position: "absolute",
    objectFit: "cover",
    width: "100%",
    height: "55%",
    left: 0,
    top: 0,
  },
});
