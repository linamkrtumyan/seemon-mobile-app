import { StyleSheet, View, Text, ScrollView } from "react-native";
import React from "react";


export default function TermOfUse({ navigation }) {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.emptyArea} />
      <Text style={styles.text} >
        seemon.am-ում գրանցվելու կամ պատվեր կատարելու համար Դուք պետք է լինեք 18
        տարեկանից բարձր:
      </Text>
      <View style={styles.emptyArea} />
      <Text  style={styles.text}>
        Օնլայն տարբերակով պատվեր կատարելու համար պետք է գրանցվել: Գրանցվելով
        կայքում՝ Գրանցված Գնորդները որևէ վճարում չեն կատարում գրանցման և
        գնումներ կատարելու համար: Անկախ պատվերի գումարի չափից առաքում ենք
        անվճար: Գրանցված գնորդները առաջինն են տեղեկանում մեր ամենօրյա
        նորություններին, լավագույն առաջարկներին և կարող են կուտակել միավորներ:
      </Text>
      <View style={styles.emptyArea} />
      <Text  style={styles.text}>
        Մեր Գնորդները կուտակում են Միավորներ պատվերների դեպքում, որն արտացոլվում
        է Բոնուսային միավորներ բաժնում: Յուրաքանչյուր 5000 դրամ պատվերի դիմաց
        գեներացվում է 5 միավոր: Յուրաքանչյուր 100 միավորի դիմաց Գնորդը ստանում է
        10000 դրամ բոնուս, որը կարող է օգտագործել կայքով նորից պատվեր կատարելու
        համար:
      </Text>
      <View style={styles.emptyArea} />
      <Text style={styles.title}>Վճարման պայմանները</Text>
      <View style={styles.emptyArea} />
      <Text  style={styles.text}>
        Գնորդը վճարում կարող է կատարել երկու տարբերակով՝ անկանխիկ և կանխիկ։
        Պատվերը ձևակերպելիս Գնորդը ընտրում է վճարման տարբերակը։ Երկու տարբերակի
        դեպքում էլ Առաքիչը տրամադրում է ՀԴՄ կտրոն:{" "}
      </Text>
      <View style={styles.emptyArea} />

      <Text  style={styles.text}>
        Կանխիկ (Check / Money Order): Գնորդը վճարում է Պատվերը ստանալիս` կանխիկ
        գումարով:
      </Text>
      <View style={styles.emptyArea} />

      <Text  style={styles.text}>
        Անկանխիկ (POS Terminal)։ Այս տարբերակն ընտրելու դեպքում Առաքիչը բերում է
        POS տերմինալ, և Գնորդը իրականացնում է քարտով վճարում տեղում՝ Պատվերը
        ստանալու ժամանակ:
      </Text>
      <View style={styles.emptyArea} />

      <Text  style={styles.text}>
        Պատվերի վերադարձի դեպքում Վճարված գումարը ետ է վերադարձվում՝ կանխիկ
        եղանակով կամ անկախիկ (բանկային քարտով վճարման դեպքում գումարը ետ է
        վերադարձվում բանկային քարտին):
      </Text>

      <View style={styles.emptyArea} />
      <Text  style={styles.text}>
        Արտարժույթով կանխիկ վճարումներ չեն ընդունվում, քանի որ դրանք հակասում են
        ՀՀ օրենսդրությանը:
      </Text>
      <View style={styles.emptyArea} />

      <Text style={styles.title}>Կայքի պատասխանատվությունը</Text>
      <View style={styles.emptyArea} />

      <Text  style={styles.text}>
        Seemon.am կայքին տրված Պատվերը (օնլայն տարբերակով) իրենից ներկայացնում է
        համանուն Ընկերությանը Գնորդի կողմից արված առաջարկ` գնելու և առաքման
        միջոցով ստանալու որևէ արտադրանք: Այդ առաջարկը համարվում է ընդունված, եթե
        Գրանցվողի էլ. փոստին seemon.am կայքի կողմից ուղարկվում է պատվերը
        հաստատող նամակ: Նամակը համարվում է Կայքի և Գնորդի միջև կնքված
        պայմանագիր:
      </Text>
      <View style={styles.emptyArea} />

      <Text  style={styles.text}>
        «Առաքումն ընդունված է» փաստաթուղթը ստորագրելուց հետո (փաստաթուղթը
        ներկայացնում է առաքիչը) Ընկերությունը դրա որակի և ամբողջականության
        առումով ոչ մի պատասխանատվություն չի կրում:
      </Text>
      <View style={styles.emptyArea} />

      <Text style={styles.text}>
        Seemon.am ընկերությունն ազատվում է պատասխանատվությունից իր ստանձնած
        պարտավորությունները չկատարելու կամ հետաձգված կատարելու համար, եթե դա
        պայմանավորված է Ընկերության վերահսկողությունից դուրս գտնվող պատճառներով:
      </Text>
      <View style={styles.emptyArea} />

      <Text style={styles.text}>
        Եթե սույն պայմաններից որևէ մեկը լիազոր մարմնի կողմից ճանաչվում է
        անվավեր, անօրինական կամ անկիրառելի, այդ պայմանը կանջատվի մնացած
        պայմաններից, որոնք կշարունակեն համարվել վավեր:
      </Text>
      <View style={styles.emptyArea} />

      <Text style={styles.text}>
        Օգտվելով seemon.am-ից` Դուք Ձեր համաձայնությունն եք տալիս վերոնշյալ
        պայմաններին,
        <Text
          style={styles.link}
          onPress={() => navigation.navigate("ShippingReturns")}
        >
          Պատվեր և վերադարձ
        </Text>{" "}
        պայմաններին,
        <Text
          style={styles.link}
          onPress={() => navigation.navigate("PrivacyPolicy")}
        >
          {" "}
          Գաղտնիության քաղաքականությանը
        </Text>
        ։
      </Text>
      <View style={styles.emptyArea} />

      <Text  style={styles.text}>
        «Դուք», «Գնորդ», «Գրանցված գնորդ», «Ձեր», «Դուք» տերմինները վերաբերում է
        այս կայքից օգտվողներին և/կամ կայք այցելողներին:
      </Text>

      <View style={styles.emptyArea} />

      <Text style={styles.text}>
        «Գրանցված գնորդ» վերաբերում է կայքում գրանցված և օնլայն տարբերակով
        Պատվեր ձևակերպողներին։
      </Text>
      <View style={styles.emptyArea} />

      <Text style={styles.text}>
        «Գնորդ» տեմինը ներառում է և՛ օնլայն, և՛ հեռախոսազանգով Պատվեր
        ձևակերպողներին։
      </Text>
      <View style={styles.emptyArea} />

      <Text style={styles.text}>
        «Ընկերություն» տերմինը վերաբերում է կայքի սեփականատեր հանդիսացող
        seemon.am ընկերությանը:
      </Text>
      <View style={styles.emptyArea} />

      <Text style={styles.text}>
        Կայքը կարող է ժամանակ առ ժամանակ փոփոխություններ կատարել Կայքի
        բովանդակության մեջ և առկա բաժիններում, որոնց մասին կտեղեկացնի
        Գրանցվողներին էլ․ ծանուցումների միջոցով:
      </Text>
      <View style={styles.emptyArea} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: "5%",
    color:"#000"
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
  text: {
    color:"#000"
  }
});
