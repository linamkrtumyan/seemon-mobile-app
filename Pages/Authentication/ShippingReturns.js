import { StyleSheet, View, Text, ScrollView } from "react-native";
import React from "react";


export default function ShippingReturns({ navigation }) {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.emptyArea} />
      <Text>
        Հարգելի՛ Այցելու, seemon.am կայքի միջոցով գնումներ կատարելու
        տարբերակներն են՝
      </Text>
      <View style={styles.emptyArea} />

      <Text>1. Օնլայն պատվիրելը,</Text>

      <Text>2. Հեռախոսազանգով պատվիրելը,</Text>
      <Text>3․ ….հասցեում գտնվող seemon.am խանութ հաճախելը:</Text>
      <View style={styles.emptyArea} />
      <Text style={styles.title}>Գրանցում</Text>
      <View style={styles.emptyArea} />
      <Text>
        Ընտրեք Գրանցվել կոճակը և լրացրեք պարտադիր դաշտերը: Գրանցման հասատումը
        կատարվում է միաժանանակ երկու տարբերակով՝ հեռախոսահամարով և էլ․ փոստի
        հասցեով։ Ձեզ անհրաժեշտ է հաստատել Ձեր հեռախոսահամարին և էլ․ փոստի
        հասցեին կարճ հաղորդագրությամբ ուղարկված կոդերը, որով հավաստում եք
        տրամադրված տեղեկությունների ճշգրիտ լինելը։
      </Text>

      <View style={styles.emptyArea} />

      <Text style={styles.title}>Պատվեր</Text>
      <View style={styles.emptyArea} />
      <Text>
        Գրանցումից հետո Ընտրեք ցանկալի արտադրանքները, նշեք քանակը, սեղմեք
        Զամբյուղ կոճակին։ Սեղմեք էջի վերևում գտնվող նշանին, ընտրեք Առաքման
        ժամանակահատվածը։ Սեղեք Վճարում, Առաքեք այս հասցեով կոճակներին։ Ընտրեք
        վճարման եղանակը՝ կանխիկ (Check / Money Order) կամ անկանխիկ (POS
        Terminal), ինչը նշանակում է, որ Առաքիչը կմոտեցնի վճարման սարքը և կվճարեք
        քարտով։ Սեղմեք Առաջ կոճակին և վերջում՝ Հաստատել կոճակին։{" "}
      </Text>

      <View style={styles.emptyArea} />
      <Text>
        Գնման Պատվերի հաստատումից հետո Գնորդի էլ. փոստի հասցեին ուղարկվում է
        նամակ, որում ներկայացվում է գնված ապրանքների ցանկը, վճարման ենթակա
        գումարը, վճարման ընտրված տարբերակը, առաքման հասցեն, առաքման ժամկետները և
        այլն:
      </Text>

      <View style={styles.emptyArea} />

      <Text style={styles.title}>Պատվերի փոփոխում</Text>
      <View style={styles.emptyArea} />
      <Text>
        Գնորդը կարող է փոփոխել Պատվերը։ Եթե ցանկանում եք փոխել պատվիրված
        արտադրանքի քանակը, ապա սեղմեք նշանին, փոխեք քանակը և սեղմեք Թարմացնել
        Զամբյուղը կոճակը։ Եթե ցանկանում եք պատվիրված արտադրանքներից որևը մեկը/մի
        քանիսը հեռացնել Զամբյուղից, ապա սեղմեք յուրաքանչյուր արտադրանքի անունով
        տողի վերջում եղած նշանին։{" "}
      </Text>

      <View style={styles.emptyArea} />

      <Text style={styles.title}>Պատվերի չեղարկում</Text>
      <View style={styles.emptyArea} />
      <Text>
        Գնորդը կարող է չեղարկել պատվերը, եթե Պատվերներ բաժնում Պատվերի
        կարգավիճակը Սպասվող է։
      </Text>

      <View style={styles.emptyArea} />

      <Text style={styles.title}>Պատվերի առաքում</Text>
      <View style={styles.emptyArea} />
      <Text>
        Պատվերի առաքումը կատարվում է անվճար և միայն Երևան քաղաքում՝ Գնորդի նշած
        ժամանակահատվածում։
      </Text>

      <View style={styles.emptyArea} />

      <Text style={styles.title}>Պատվերի վերադարձ</Text>
      <View style={styles.emptyArea} />
      <Text>
        Պատվերի որակային և քանակային համապատասխանությունը անհրաժեշտ է ստուգել
        Առաքիչի ներկայությամբ: Թերություններ հայտնաբերելու դեպքում Գնորդը կարող
        է իրականացնել արտադրանքի վերադարձ տեղում: Ետ վերադարձվող Պատվերի համար
        վճարված ամբողջ գումարը ենթակա է վերադարձման:
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
  },
  link: {
    color: "#f04a38",
  },
});
