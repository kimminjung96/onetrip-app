import { StatusBar } from "expo-status-bar";
import { API_URL } from "../config/constans";
import axios from "axios";
import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  SafeAreaView,
  Dimensions,
  TouchableOpacity,
  Alert,
} from "react-native";
import Carousel from "react-native-reanimated-carousel";

import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/ko";
dayjs.locale("ko");

dayjs.extend(relativeTime);

export default function Main(props) {
  const [products, setProducts] = useState([]);
  const [product, setProduct] = useState([]);
  const [amount, setAmount] = useState([]);
  const [review, setReview] = useState([]);

  const PAGE_WIDTH = Dimensions.get("window").width;

  const baseOptions = {
    sliderWidth: PAGE_WIDTH,
    itemWidth: PAGE_WIDTH,
    itemHeight: 150,
    width: PAGE_WIDTH,
    height: 150,
    style: {
      width: PAGE_WIDTH,
    },
  };

  useEffect(() => {
    axios
      .get(`${API_URL}/product/`)
      .then((result) => {
        setProducts(result.data.product);
      })
      .catch((error) => {
        console.error(error);
      });
    axios
      .get(`${API_URL}/producttheme/`)
      .then((result) => {
        setProduct(result.data.product);
      })
      .catch((error) => {
        console.error(error);
      });
    axios
      .get(`${API_URL}/productdate/`)
      .then((result) => {
        setAmount(result.data.product);
      })
      .catch((error) => {
        console.error(error);
      });
    axios
      .get(`${API_URL}/review`)
      .then((result) => {
        setReview(result.data.review);
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <View>
      <StatusBar style="auto" />
      <ScrollView>
        <View style={styles.container}>
          <TouchableOpacity
            onPress={() => {
              Alert.alert("배너클릭");
            }}
          >
            <Carousel
              {...baseOptions}
              autoPlay={true}
              scrollAnimationDuration={1500}
              data={[
                "https://port-0-ver2-onetrip-server-nx562olfc5jcth.sel3.cloudtype.app/upload/mainbanner.png",
                "https://port-0-ver2-onetrip-server-nx562olfc5jcth.sel3.cloudtype.app/upload/reviewbanner.png",
              ]}
              renderItem={(banner) => {
                return (
                  <Image
                    source={{ uri: `${banner.item}` }}
                    style={styles.bannerImg}
                    resizeMode={"contain"}
                  />
                );
              }}
            />
          </TouchableOpacity>
          <Text style={styles.title}>👍원트립 패키지</Text>
          <View style={styles.packageWrap}>
            {product &&
              product.map((product) => {
                return (
                  <View style={styles.package} key={product.id}>
                    <TouchableOpacity
                      onPress={() => {
                        props.navigation.navigate("Product", {
                          id: product.id,
                        });
                      }}
                    >
                      <View style={styles.packageCard}>
                        {product.soldout === 1 && (
                          <View style={styles.soldoutBlur}>
                            <Text style={styles.soldoutText}>예약 마감</Text>
                          </View>
                        )}
                        <Image
                          source={{ uri: `${API_URL}/${product.imageUrl}` }}
                          style={styles.packageImg}
                          resizeMode={"contain"}
                        />
                        <View style={styles.packageText}>
                          <Text style={styles.packageName}>
                            {product.p_name}
                          </Text>
                          <Text style={styles.packagePrice}>
                            {product.price
                              .toString()
                              .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                            원
                          </Text>
                        </View>
                      </View>
                    </TouchableOpacity>
                  </View>
                );
              })}
          </View>
          <Text style={styles.title}>👍신규패키지</Text>
          {products &&
            products.map((product) => {
              return (
                <TouchableOpacity
                  key={product.id}
                  onPress={() => {
                    props.navigation.navigate("Product", { id: product.id });
                  }}
                >
                  <View style={styles.productCard}>
                    {product.soldout === 1 && (
                      <View style={styles.soldoutBlur}>
                        <Text style={styles.soldoutText}>예약 마감</Text>
                      </View>
                    )}
                    <Image
                      source={{ uri: `${API_URL}/${product.imageUrl}` }}
                      style={styles.productImg}
                      resizeMode={"contain"}
                    />
                    <View style={styles.productText}>
                      <Text style={styles.productName}>
                        &#91; {product.p_name} &#93;
                      </Text>
                      <Text style={styles.productCountry}>
                        {product.p_country}
                      </Text>
                      <Text style={styles.productPrice}>
                        {product.price
                          .toString()
                          .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                        원
                      </Text>
                    </View>
                    <View style={styles.productFooter}>
                      <Text style={styles.productDate}>
                        {dayjs(product.createdAt).format("YY/MM")}
                      </Text>
                    </View>
                  </View>
                </TouchableOpacity>
              );
            })}

          <Text style={styles.title}>🙌마감임박🙌</Text>
          {amount &&
            amount.map((product) => {
              return (
                <TouchableOpacity
                  key={product.id}
                  onPress={() => {
                    props.navigation.navigate("Product", { id: product.id });
                  }}
                >
                  <View style={styles.amountCard}>
                    {product.soldout === 1 && (
                      <View style={styles.soldoutBlur}>
                        <Text style={styles.soldoutText}>예약 마감</Text>
                      </View>
                    )}
                    <Image
                      source={{ uri: `${API_URL}/${product.imageUrl}` }}
                      style={styles.amountImg}
                      resizeMode={"contain"}
                    />
                    <View style={styles.amountText}>
                      <Text style={styles.amountName}>{product.p_name}</Text>
                      <Text style={styles.amountPrice}>
                        {product.price
                          .toString()
                          .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                        원
                      </Text>
                      <Text style={styles.soldout}>
                        남은수량 : {product.count}개
                      </Text>
                    </View>
                  </View>
                </TouchableOpacity>
              );
            })}

          <Text style={styles.title}>👍원트립 후기</Text>
          {review &&
            review.map((data) => {
              return (
                <View key={data.id} style={styles.reviewCard}>
                  <Image
                    source={{ uri: `${API_URL}/${data.r_imageUrl}` }}
                    style={styles.reviewImg}
                  />
                  <View style={styles.reviewInfo}>
                    <Text style={styles.reviewArea}>{data.r_area}</Text>
                    <Text style={styles.reviewTitle}>{data.r_title}</Text>
                    <Text style={styles.reviewText}>{data.r_text}</Text>
                    <Text style={styles.reviewName}>{data.user_name}</Text>
                  </View>
                  <View style={styles.reviewMark}>
                    <Text style={styles.reviewDay}>
                      {dayjs(data.createdAt).format("YYYY/MM")}
                    </Text>
                  </View>
                </View>
              );
            })}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f0f0",
    position: "relative",
    alignItems: "center",
    justifyContent: "center",
  },
  bannerImg: {
    position: "absolute",
    flex: 1,
    width: "100%",
    height: "100%",
  },
  title: {
    width: 360,
    textAlign: "left",
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 16,
    marginBottom: 8,
    color: "#13608c",
  },
  soldoutBlur: {
    position: "absolute",
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    backgroundColor: "#ffffffaa",
    zIndex: 999,
    borderRadius: 16,
  },
  soldoutText: {
    fontSize: 20,
    fontWeight: 600,
    color: "#d93333",
    textAlign: "center",
    paddingTop: "30%",
  },
  /* 패키지 */
  packageWrap: {
    width: 360,
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  package: {
    width: "48%",
    marginBottom: 16,
  },
  packageCard: {
    width: "100%",
    marginBottom: 16,
    overflow: "hidden",
  },
  packageImg: {
    width: "100%",
    height: 110,
    objectFit: "cover",
    borderRadius: 16,
  },
  packageText: {
    marginTop: 6,
  },
  packageName: {
    overflow: "hidden",
    fontSize: 14,
  },
  packagePrice: {
    fontSize: 18,
    paddingBottom: 6,
    fontWeight: "600",
  },
  /* 신규상품 */
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
    objectFit: "cover",
  },
  productText: {
    padding: 16,
  },
  productFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 12,
  },
  productName: {
    fontSize: 16,
  },
  productPrice: {
    fontSize: 18,
    fontWeight: "600",
    marginTop: 8,
  },
  productDate: {
    fontSize: 16,
  },
  /* 마감임박 */
  amountCard: {
    width: 360,
    borderColor: "rgb(230,230,230)",
    borderWidth: 1,
    borderRadius: 16,
    backgroundColor: "#fff",
    overflow: "hidden",
    marginBottom: 16,
    position: "relative",
  },
  amountImg: {
    width: "100%",
    height: 120,
    objectFit: "cover",
  },
  amountText: {
    position: "absolute",
    right: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "#00000066",
    padding: 16,
  },
  amountName: {
    color: "#fff",
    fontSize: 14,
  },
  amountPrice: {
    fontSize: 20,
    color: "#fff",
    fontWeight: "600",
    marginBottom: 16,
  },
  soldout: {
    fontSize: 12,
    width: "25%",
    padding: 3,
    backgroundColor: "#ffffffaa",
    borderRadius: 15,
    color: "#d93333",
  },
  /* 리뷰 */
  reviewCard: {
    width: 360,
    height: 280,
    borderColor: "rgb(230,230,230)",
    borderWidth: 1,
    borderRadius: 16,
    backgroundColor: "#fff",
    overflow: "hidden",
    marginBottom: 16,
    position: "relative",
  },
  reviewImg: {
    position: "absolute",
    objectFit: "cover",
    width: 360,
    height: "100%",
    left: 0,
    top: 0,
  },
  reviewMark: {
    position: "absolute",
    top: "4%",
    right: "4%",
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 5,
    color: "#fff",
  },
  reviewDay: {
    color: "#333",
    fontSize: 12,
  },
  reviewInfo: {
    position: "absolute",
    opacity: 0.8,
    left: 0,
    bottom: 0,
    width: "100%",
    textAlign: "left",
    padding: "4%",
    backgroundColor: "#fff",
  },
  reviewArea: {
    fontSize: 12,
    color: "#444",
    marginBottom: 4,
  },
  reviewTitle: {
    fontSize: 16,
    marginBottom: 2,
  },
  reviewText: {
    marginBottom: 6,
  },
  reviewName: {
    fontSize: 10,
  },
});
