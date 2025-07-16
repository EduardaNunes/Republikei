import { ScrollView, View } from "react-native";

import SquareButton from "@/components/button";
import BackButton from "@/components/backButton";
import Categories from "@/components/categories";
import Input from "@/components/input";
import LandlordName from "@/components/landlordName";
import PhotosCounter from "@/components/photosCounter";
import PostBlock from "@/components/postBlock";
import PriceAndContactButton from "@/components/priceAndContactButton";
import StatusPost from "@/components/statusPost";

import { useRouter } from "expo-router";
import { styles } from "./styles";

export default function TestComponents() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <ScrollView>
        <BackButton onPress={() => router.back()}/>
        <Categories />
        <Input title={"Input"} />
        <LandlordName name={"Nome"} phone={"(83) 93784-3947"} />
        <PhotosCounter total={20} />
        <PostBlock image={""} title={"Quarto - centro"} price={800} />
        <PostBlock
          type="favorite"
          image={""}
          title={"Quarto - centro"}
          price={800}
        />
        <StatusPost type={"favorite"} />
        <StatusPost type={"visibility"} />
        <SquareButton name={"Clique"} />
      </ScrollView>
      <PriceAndContactButton price={800} />
    </View>
  );
}
