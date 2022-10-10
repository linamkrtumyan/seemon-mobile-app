import {
  StyleSheet,
  View,
  Text,
  ScrollView,
} from "react-native";
import React from "react";


export default function AboutUs({ navigation }) {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.emptyArea} />
      <Text  style={styles.text}>
        seemon.am-ը օնլայն հարթակ է, որտեղ ներկայացված են համանուն խանութում
        առկա արտադրանքները: Գնորդները մեր հարթակի միջոցով կարող են օնլայն կամ
        հեռախոսազանգով պատվիրել արտադրանքներ, իսկ մենք կապահովենք պատվերների
        անվճար առաքումը՝ խնայելով գնորդների ժամանակն ու լրացուցիչ միջոցների
        ծախսումը:
      </Text>
      <View style={styles.emptyArea} />

      <Text style={styles.title}>Տեսլականը</Text>
      <View style={styles.emptyArea} />
      <Text style={styles.text}>
        seemon.am-ի տեսլականն է դառնալ սպառողների առօրյայի մի մասը՝ որպես
        պարենային արտադրանքների գնման վստահելի և անփոխարինելի էլեկտրոնային
        առևտրային հարթակ:
      </Text>

      <View style={styles.emptyArea} />

      <Text style={styles.title}>Առաքելությունը</Text>
      <View style={styles.emptyArea} />
      <Text style={styles.text}>
        Մեր առաքելությունն է բարձրացնել օնլայն պատվերների դեպքում սպառողների
        գոհունակության մակարդակը՝ ապահովելով ցանկալի արտադրանքների անվճար
        առաքումը նախընտրելի ժամանակահատվածում:
      </Text>

      <View style={styles.emptyArea} />

      <Text style={styles.title}>Ինչու՞ օգտվել մեր հարթակից</Text>
      <View style={styles.emptyArea} />
      <Text style={styles.text}>1.Առաքում ենք անվճար:</Text>
      <Text style={styles.text}>
        2.Կայքում ներկայացնում ենք այդ պահին վաճառքի համար առկա արտադրանքների
        իրական նկարները:
      </Text>
      <Text style={styles.text}>3.Առաքում ենք Գնորդի նախընտրած ժամանակահատվածում:</Text>
      <Text style={styles.text}>
        4.Ապահովում ենք Գնորդի ժամանակի և ֆինանսական միջոցների խնայում:
      </Text>

      <View style={styles.emptyArea} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: "5%",
  },
  emptyArea: {
    marginVertical: 10,
  },
  title: {
    textAlign: "center",
    fontSize: 16,
    color:"#000"
  },
  link: {
    color: "#f04a38",
  },
  text:{
    color:"#000"
  }
});
