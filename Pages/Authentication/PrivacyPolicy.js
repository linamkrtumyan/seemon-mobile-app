import { StyleSheet, View, Text, ScrollView } from "react-native";
import React from "react";


export default function PrivacyPolicy({ navigation }) {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.emptyArea} />
      <Text  style={styles.text}>
        «Գաղտնիության Քաղաքականության» դրույթները տարածվում են կայքից օգտվողների
        և կայք այցելողների վրա: Օգտվելով կայքից կամ այցելելով կայք՝ Դուք տալիս
        եք Ձեր համաձայնությունը Գաղտնիության քաղաքականության դրույթներին և մեր
        Ընկերության կողմից Ձեր անձնական տեղեկությունների օգտագործմանը:
      </Text>
      <View style={styles.emptyArea} />

      <Text style={styles.title}>Տեղեկությունների հավաքագրումը</Text>
      <View style={styles.emptyArea} />
      <Text style={styles.text}>Ընկերությունը հավաքագրում է հետևյալ տեղեկությունները՝</Text>
      <View style={styles.emptyArea} />
      <Text style={styles.text}>1. Էլ. փոստի հասցե, անուն, ազգանուն, հեռախոսահամար,</Text>
      <Text style={styles.text}>
        2. Գնորդի կատարած գնումների պատմություն և նախընտրած ապրանքների ցանկ,
      </Text>
      <Text style={styles.text}>3. Առաքման հասցե(ները),</Text>
      <Text style={styles.text}>4. Ընկերության հետ ունեցած նամակագրություն,</Text>
      <Text style={styles.text}>5. Տրամադրված այլ ինֆորմացիա։</Text>

      <View style={styles.emptyArea} />

      <Text style={styles.title}>Տեղեկությունների օգտագործման նպատակները</Text>
      <View style={styles.emptyArea} />

      <Text style={styles.text}>
        {" "}
        Հավաքագրված տեղեկությունները օգտագործում են հետևյալ նպատակներով՝
      </Text>
      <View style={styles.emptyArea} />
      <Text style={styles.text}>1. Պատվերը հաստատող նամակի ուղարկում,</Text>
      <Text style={styles.text}>
        2. Նորույթների, լավագույն առաջարկների, կուտակվող միավորների,
        Ընկերությունում/կայքում կատարվելիք/կատարվող փոփոխությունների մասին
        իրազեկող նամակների ուղարկում,
      </Text>
      <Text style={styles.text}>3. Պարբերաբար շուկայական հետազոտությունների կատարում,</Text>
      <Text style={styles.text}>4. Գնորդի համար կայքի օգտագործման բարելավում։</Text>

      <View style={styles.emptyArea} />

      <Text style={styles.title}>Տեղեկությունների չբացահայտումը</Text>
      <View style={styles.emptyArea} />
      <Text style={styles.text}>
        Ձեր կողմից մեզ տրամադրված տեղեկությունները համարվում են միանգամայն
        գաղտնի և չեն կարող տրամադրվել որևէ երրորդ կողմի:
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
