import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from "react-native";
import { API_URL } from "../config/constans";
import axios from "axios";
import dayjs from "dayjs";

const Product = (props) => {
  const { id } = props.route.params;
  const [product, setProduct] = useState(null);

  const getPackage = () => {
    axios
      .get(`${API_URL}/products/${id}`)
      .then((result) => {
        setProduct(result.data.product);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    getPackage();
  }, []);

  if (!product) {
    return <ActivityIndicator />;
  }

  const onPressButton = () => {
    if (product.soldout !== 1) {
      Alert.alert("구매가 완료되었습니다.");
    }
  };

  return (
    <>
      <View Style={styles.container}>
        <ScrollView>
          <View>
            <Image
              style={styles.productImage}
              source={{ uri: `${API_URL}/${product.imageUrl}` }}
            />
          </View>
          <View style={styles.productText}>
            <Text style={styles.productArea}>&#91;{product.p_area}&#93;</Text>
            <Text style={styles.productName}>{product.p_name}</Text>

            <Text style={styles.productDate}>
              여행날짜 : {dayjs(product.p_sdate).format("YYYY.MM.DD")}
              &nbsp;&nbsp;~&nbsp;&nbsp;
              {dayjs(product.p_edate).format("YYYY.MM.DD")}
            </Text>
            <View style={styles.divider}></View>
            <View style={styles.price}>
              <Text style={styles.priceText}>상품 가격 :&nbsp;</Text>
              <Text style={styles.productPrice}>
                {product.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                원
              </Text>
            </View>
          </View>
        </ScrollView>

        <TouchableOpacity onPress={onPressButton}>
          <View
            style={
              product.soldout === 1
                ? styles.purchaseDisabled
                : styles.purchaseBtn
            }
          >
            <Text style={styles.purchaseText}>
              {product.soldout === 1 ? "품절" : "구매하기"}
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  productImage: {
    width: "100%",
    height: 300,
    resizeMode: "cover",
  },
  productText: {
    padding: 16,
  },

  divider: {
    backgroundColor: "#ddd",
    height: 1,
    marginVertical: 16,
  },
  productArea: {
    fontSize: 18,
    fontWeight: 500,
    marginTop: 8,
    marginBottom: 6,
  },
  productName: {
    fontSize: 26,
    fontWeight: 400,
    marginBottom: 20,
  },
  productDate: {
    fontSize: 20,
    marginTop: 4,
    color: "#000000aa",
  },
  price: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "flex-end",
    marginTop: 16,
    paddingBottom: 100,
  },
  priceText: {
    fontSize: 20,
    fontWeight: 600,
    color: "#000000aa",
  },
  productPrice: {
    fontSize: 28,
    fontWeight: 700,
    color: "#13608c",
  },
  purchaseBtn: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#13608c",
    height: 60,
    alignItems: "center",
    justifyContent: "center",
  },
  purchaseText: {
    color: "white",
    fontSize: 24,
  },
  purchaseDisabled: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "gray",
    height: 60,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default Product;
