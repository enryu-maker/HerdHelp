import {Animated} from 'react-native'
import React, { useRef } from 'react'
import { Dimensions,Platform } from "react-native";
const { width, height } = Dimensions.get("window");
export const images ={
    logo:require("../assets/Logo/Logo01.png"),
    eye:require("../assets/Logo/eye.png"),
    eye_close:require("../assets/Logo/eye_close.png"),
    correct:require("../assets/Logo/correct.png"),
    cancel:require("../assets/Logo/cancel.png"),
    login:require("../assets/Logo/user.png"),
    search:require("../assets/Logo/search.png"),
    filter:require("../assets/Logo/filter.png"),
    menu:require("../assets/Logo/menu.png"),
    bread:require("../assets/animal_logo/newborn.png"),
    purchased:require("../assets/animal_logo/cash.png"),
    menu:require("../assets/Logo/open-menu.png"),
    back:require("../assets/Logo/previous.png"),
    home:require("../assets/Logo/home.png"),
    add:require("../assets/Logo/pet-care.png"),
    med:require("../assets/Logo/first-aid-kit.png"),
    weight:require("../assets/Logo/weight-scale.png"),
    tag:require("../assets/Add/price-tag.png"),
    name:require("../assets/Add/name.png"),
    mom:require("../assets/Add/bird.png"),
    scale:require("../assets/Add/weight.png"),
    money:require("../assets/Add/money.png"),
    age:require("../assets/Add/age.png"),
    vacc:require("../assets/Add/vaccine.png"),
    thirty:require("../assets/Add/speed-limit.png"),
    dog:require("../assets/Add/breed.png"),
    disease:require("../assets/Add/disease.png"),
    medicines:require("../assets/Add/medicines.png"),
    dropper:require("../assets/Add/dropper.png"),
    withdraw:require("../assets/Add/atm.png")
}
export const COLORS={
    Primary:"rgb(126,204,122)",
    transparentPrimary: "#d6f5d6",
    transparentPrimary2: "#eaf7e9",
    white:"#ffffff",
    lightGray1: "#DDDDDD",
    lightGray2: "#e6e6e6",
    black:"black",
    gray: "#898B9A",
    gray2: "#BBBDC1",
    gray3: "#CFD0D7",
    darkGray: "#525C67",
    darkGray2: "#757D85",
    transparent: "transparent",
    red: "#FF1717",
    green: "#27AE60",
    layout:"#f0f0f0"
}

export const SIZES = {
    // global sizes
    base: 8,
    font: 14,
    radius: 12,
    padding: 24,
    base2: 10,
    // font sizes
    largeTitle: 40,
    h1: 30,
    h2: 22,
    h3: 16,
    h4: 14,
    h5: 12,
    body1: 30,
    body2: 22,
    body3: 16,
    body4: 14,
    body5: 12,

    // app dimensions
    width,
    height
};
const type = { base: (Platform.OS === "ios" ? "Helvetica Neue" : "sans-serif"), 
bold: (Platform.OS === "ios" ? "HelveticaNeue-Bold" : "sans-serif-condensed"), 
emphasis: (Platform.OS === "ios" ? "HelveticaNeue-Italic" : "sans-serif") }
export const FONTS = {
    largeTitle: { fontFamily: type.bold, fontSize: SIZES.largeTitle },
    h1: { fontFamily: type.bold, fontSize: SIZES.h1, lineHeight: 36, fontWeight:'bold'},
    h2: { fontFamily: type.bold, fontSize: SIZES.h2, lineHeight: 30 , fontWeight:'bold'},
    h3: { fontFamily: type.bold, fontSize: SIZES.h3, lineHeight: 22 , fontWeight:'bold'},
    h4: { fontFamily: type.bold, fontSize: SIZES.h4, lineHeight: 22 , fontWeight:'bold'},
    h5: { fontFamily: type.bold, fontSize: SIZES.h5, lineHeight: 22 , fontWeight:'bold'},
    body1: { fontFamily: type.base, fontSize: SIZES.body1, lineHeight: 36 },
    body2: { fontFamily:type.base, fontSize: SIZES.body2, lineHeight: 30 },
    body3: { fontFamily:type.base, fontSize: SIZES.body3, lineHeight: 22 },
    body4: { fontFamily:type.base, fontSize: SIZES.body4, lineHeight: 22 },
    body5: { fontFamily:type.base, fontSize: SIZES.body5, lineHeight: 22 },
};
export const dummydata = [
    {
        Id:1,
        Tag_number:1234,
        Name:'Julia',
        Species: 'Cow',
        purchased:1,
        bornimg:require("../assets/animal_logo/newborn.png"),
        cash:require("../assets/animal_logo/cash.png"),
        Gender:require("../assets/animal_logo/female.png"),
        GenderType:"Female",
        weight:120,
        image:require("../assets/animal_logo/cow.png")
    },
    {
        Id:2,
        Tag_number:2542,
        Name:'Rock',
        Species: 'Chicken',
        purchased:0,
        bornimg:require("../assets/animal_logo/newborn.png"),
        cash:require("../assets/animal_logo/cash.png"),
        Gender:require("../assets/animal_logo/female.png"),
        GenderType:"Female",
        weight:2,
        image:require("../assets/animal_logo/chicken.png")
    },
    {
        Id:3,
        Tag_number:6757,
        Name:'Panther',
        Species: 'Pig',
        purchased:1,
        bornimg:require("../assets/animal_logo/newborn.png"),
        cash:require("../assets/animal_logo/cash.png"),
        Gender:require("../assets/animal_logo/male.png"),
        GenderType:"Male",
        weight:70,
        image:require("../assets/animal_logo/pig.png")
    },
    {
        Id:4,
        Tag_number:2525,
        Name:'Hairy',
        Species: 'Sheep',
        GenderType:"Female",
        purchased:0,
        bornimg:require("../assets/animal_logo/newborn.png"),
        cash:require("../assets/animal_logo/cash.png"),
        Gender:require("../assets/animal_logo/female.png"),
        weight:70,
        image:require("../assets/animal_logo/sheep.png")
    },
    {
        Id:5,
        Tag_number:7686,
        Name:'Horny',
        Species: 'Goat',
        purchased:0,
        bornimg:require("../assets/animal_logo/newborn.png"),
        cash:require("../assets/animal_logo/cash.png"),
        Gender:require("../assets/animal_logo/male.png"),
        GenderType:"Male",
        weight:70,
        image:require("../assets/animal_logo/goat.png")
    },
    {
        Id:1,
        Tag_number:2352,
        Name:'Honey',
        Species: 'Cow',
        GenderType:"Female",
        purchased:1,
        bornimg:require("../assets/animal_logo/newborn.png"),
        cash:require("../assets/animal_logo/cash.png"),
        Gender:require("../assets/animal_logo/female.png"),
        weight:120,
        image:require("../assets/animal_logo/cow.png")
    },
    {
        Id:1,
        Tag_number:2352,
        Name:'bunny',
        Species: 'Rabbit',
        GenderType:"Female",
        purchased:1,
        bornimg:require("../assets/animal_logo/newborn.png"),
        cash:require("../assets/animal_logo/cash.png"),
        Gender:require("../assets/animal_logo/female.png"),
        weight:12,
        image:require("../assets/animal_logo/rabbit.png")
  },
]
export const catedata = [
    {
      value: '1',
      label: 'Cow',
      avatarSource:require("../assets/animal_logo/cow.png")
    },
    {
      value: '2',
      label: 'Chicken',
      avatarSource:require("../assets/animal_logo/chicken.png")
    },
    {
      value: '3',
      label: 'Pig',
      avatarSource: require("../assets/animal_logo/pig.png")
    },
    {
      value: '4',
      label: 'Sheep',
      avatarSource: require("../assets/animal_logo/sheep.png")
    },
    {
        value: '5',
        label: 'Goat',
        avatarSource: require("../assets/animal_logo/goat.png")
      },
    {
        value: '6',
        label: 'Rabbit',
        avatarSource: require("../assets/animal_logo/rabbit.png")
      },
  ];
  export const genderdata = [
    {
      value: '1',
      label: 'Male',
      avatarSource:require("../assets/animal_logo/male.png")
    },
    {
      value: '2',
      label: 'Female',
      avatarSource:require("../assets/animal_logo/female.png")
    },
];
export const Breed = [
  {
    value: '1',
    label: 'Yes',
    avatarSource:require("../assets/animal_logo/yes.png")
  },
  {
    value: '2',
    label: 'No',
    avatarSource:require("../assets/animal_logo/no.png")
  },
];