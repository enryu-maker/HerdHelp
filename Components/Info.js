import {View, Text, TouchableOpacity, Image, ScrollView,Alert,ActivityIndicator} from 'react-native';
import React from 'react';
import Header from './Header';
import {COLORS, SIZES, images, FONTS} from './Constants';
import InfoItem from './InfoItem';
import axiosIns from '../helpers/helpers';
import Status from './Status';
import TextButton from './TextButton';
import CustomButton from '../Screens/Home/CustomButtom';
import PickerType from '../Screens/Livestocks/PickerType';

export const Info = ({navigation, route}) => {
  const [animal, setAnimal] = React.useState([]);
  const [animals, setAnimals] = React.useState([]);

  const [med, setMed] = React.useState([]);
  const [cond, setCond] = React.useState(false);
  const [show, setShow] = React.useState(false);
  const [profile_pic, setprofile_pic] = React.useState([]);
  const [picdata, setPicdata] = React.useState('');
  const [pic, setPic] = React.useState('');
  const [showu, setshowu] = React.useState(false);



  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2
  })
  async function getMedication(tag) {
    let {data} = await axiosIns.get(`getmedication/${tag}`);
    return data;
  }
  async function getanimal(tag) {
    let {data} = await axiosIns.get(`animals/${tag}`);
    return data;
  }
  React.useEffect(() => {
    let {value} = route.params;
    setAnimals(value)
    let {cond} = route.params;
    getanimal(value.tag_number).then((data)=>{
      setAnimal(data)
    })
    getMedication(value.tag_number).then((data)=>{
      setMed(data)
    });
    setCond(cond);    
  }, [animal]);

  function renderSectionOne() {
    return (
      <View
        style={{
          marginTop: 15,
          borderRadius: SIZES.radius,
          paddingHorizontal: SIZES.radius,
          backgroundColor: COLORS.lightGray2,
        }}>
        <InfoItem label="Name" value={animal?.name} />
        <InfoItem label="Gender" value={animal?.gender} />
        {
          animal?.gender == "Female"?(
            <InfoItem
          label="Bred"
          value={animal?.bred == false ? 'No' : 'Yes'}
        />
          ):(
            <View></View>
          )
        }
        <InfoItem label="Tag Number" value={animal?.support_tag} />
        <InfoItem
          label="Weight"
          value={global.unit?`${animal?.weight} lbs`:`${animal?.weight_kg} kg`}
          withDivider={false}
        />
      </View>
    );
  }
  function renderFileUri() {
    if (animal.animal_image) {
      return (
        <View style={{
          height:100,
          width:100,
          borderRadius:100/2,
          alignSelf:"center",
        }}>
        <Image
          source={{uri: animal.animal_image}}
          style={{
            width: 100,
            height: 100,
            borderRadius: 100 / 2,
            alignSelf: 'center',
            borderWidth:2,
          }}
        />
        <View style={{
          position:"absolute",
          alignSelf:"flex-end",
          backgroundColor:COLORS.black,
          height:18,
          width:28,
          justifyContent:"center",
          marginTop:70,
          borderRadius:6
        }}>
          <Text style={{
          color:COLORS.white,
          ...FONTS.h5,
          alignSelf:"center"
          }}>
          Edit
          </Text>
        </View>
        <Text style={{alignSelf: 'center', ...FONTS.h3, paddingBottom: 10}}>
            ID: {animal?.support_tag}
          </Text>
        </View>
      );
    } else {
      return (
        <View style={{
          // backgroundColor:COLORS.lightGray1,
          height:100,
          width:100,
          borderRadius:100/2,
          alignSelf:"center",
        }}>

        <Image
          // source={{uri:`https://ui-avatars.com/api/?name=${username}`}}
          source={{uri:animal?.image}}
          resizeMethod="auto"
          resizeMode="contain"
          style={{
            width: 100,
            height: 100,
            borderRadius: 100 / 2,
            alignSelf: 'center',
          borderWidth:2,
          }}
        />


        <View style={{
          position:"absolute",
          alignSelf:"flex-end",
          backgroundColor:COLORS.black,
          height:18,
          width:28,
          justifyContent:"center",
          marginTop:70,
          borderRadius:6
        }}>
          <Text style={{
          color:COLORS.white,
          ...FONTS.h5,
          alignSelf:"center"
          }}>
          Edit
          </Text>
        </View>
        <Text style={{alignSelf: 'center', ...FONTS.h3, paddingBottom: 10}}>
            ID: {animal?.support_tag}
          </Text>
        </View>


        // 
      );
    }
  }
  
  function renderSectionZero() {
    return (
      
        <CustomButton
        border={false}
          onPress={() => {
            navigation.navigate('MedCard', {
              animal:animal
            });
          }}
          icon={images.rightone}
          iconStyle={{
            height:20,
            width:20
          }}
          label={"Medical History"}
          buttonContainerStyle={{
            marginTop: SIZES.padding,
            borderRadius: SIZES.radius,
            paddingHorizontal: SIZES.radius,
            backgroundColor: COLORS.Primary,
            width:"100%"
          }}
          iconContainerStyle={{
            borderWidth:0
          }}
          label2={med.length}
          />
      
    );
  }
  function Vaccinated() {
    return (
      <View
        style={{
          marginTop: SIZES.padding,
          borderRadius: SIZES.radius,
          paddingHorizontal: SIZES.radius,
          backgroundColor: COLORS.lightGray2,
          marginBottom: SIZES.padding,
        }}>
        <InfoItem
          label="Vaccinated?"
          value={animal?.vaccinated ? 'Yes' : 'No'}
        />
        {animal?.vaccinated ? (
          <InfoItem
            label="Vacc Date"
            value={animal?.vaccination_date}
            withDivider={false}
          />
        ) : (
          <View></View>
        )}
      </View>
    );
  }
  function Type() {
    return (
      <View
        style={{
          marginTop: SIZES.padding,
          borderRadius: SIZES.radius,
          paddingHorizontal: SIZES.radius,
          backgroundColor: COLORS.lightGray2,
        }}>
        <InfoItem
          label="Type"
          value={animal?.bought == false ? 'Birth' : 'Purchased'}
        />
        {animal?.bought == false ? (
          <View>
            <InfoItem label="Date Of Birth" value={animal?.birth_date} />
            <InfoItem
              label="Mother Tag"
              value={animal?.mother_supporttag}
            />
            <InfoItem
              label="Father Tag"
              value={animal?.father_supporttag}
              withDivider={false}
            />
          </View>
        ) : (
          <>
          <InfoItem
            label="Price"
            value={`${formatter.format(animal?.price)}`}
            withDivider={false}
          />
          </>
        )}
        
      </View>
    );
  }
  function renderSectionFour() {
    return (
      <View
        style={{
          marginTop: SIZES.padding,
          borderRadius: SIZES.radius,
          paddingHorizontal: SIZES.radius,
          backgroundColor: COLORS.lightGray2,
        }}>
          <InfoItem
            label="Registration"
            value={(animal?.registration)}
          />
        <InfoItem label="Breed" value={animal?.breed} withDivider={false}/>
      </View>
    );
  }
  function Babies(){

    return(
    <CustomButton
        buttonContainerStyle={{
          marginTop: SIZES.padding,
          borderRadius: SIZES.radius,
          paddingHorizontal: SIZES.radius,
          backgroundColor: COLORS.Primary,
          width:"100%"
        }}
        border={false}
        icon={images.rightone}
          iconStyle={{
            height:20,
            width:20
          }}
        iconContainerStyle={{
          borderWidth:0
        }}
        label={"Babies"}
        label2={animals.children.length}
        label2Style={{
          color:COLORS.Primary,
          justifyContent:"center",
          alignSelf:"center"
        }}
        onPress={()=>{
          navigation.navigate('Babies', {
            label: "Babies",
            data: animal?.children,
            cond:true
          });
        }}
        />)
  }

  function renderHeader() {
    return (
      <Header
        leftComponent={
          <View
            style={{
              justifyContent: 'center',
              position: 'absolute',
              marginTop: 20,
              zIndex: 1,
            }}>
            <TouchableOpacity
              style={{
                marginLeft: 25,
                backgroundColor:COLORS.Primary,
                height:40,
                width:40,
                justifyContent:"center",
                borderRadius:40/2,
                }}
              onPress={() => {
                navigation.goBack();
              }}>
              <Image
                source={images.back}
                style={{width: 25, height: 25, tintColor: COLORS.white,alignSelf:"center"}}
              />
            </TouchableOpacity>
          </View>
        }
        title={'More Info'}
        titleStyle={{
          marginLeft:cond?120:0
        }}
        rightComponent={
          cond?
          <TouchableOpacity
          style={{
            justifyContent:"center"
            }}
          onPress={()=>{
            setShow(true)
          }}
          >
          <Text
          style={{
            padding:SIZES.padding,
            color:COLORS.Primary,
            ...FONTS.h2
          }}
          >Status</Text>
          </TouchableOpacity>:<View></View>
          
        }
      />
    );
  }
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: COLORS.white,
      }}>
      {renderHeader()}
      {
        show &&
        <Status show={show} setShow={setShow} animal={animal}/>
      }
      <PickerType show={show} setshow={setShow} setPic={setPic} setPicdata={setPicdata} setprofile_pic={setprofile_pic} setshowc={setshowu}/>
      <Update showu={showu} setshowu={setshowu} profile={profile_pic} link={`animal/${animal?.tag_number}`} lable={'animal_image'} msg={'Profile updated'}/>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: SIZES.padding,
        }}>
          <TouchableOpacity onPress={()=>{
            setShow(true)
          }}>
            {renderFileUri()}
          </TouchableOpacity>
          
        {renderSectionOne()}
        {renderSectionZero()}
        {
          animals.children?.length > 0 ?Babies():null
        }
        
        {Type()}
        {renderSectionFour()}
        {Vaccinated()}
      </ScrollView>

      {cond?
      <TextButton
        onPress={() => {
          Alert.alert("Are you sure",
          "You want ot edit animal?",
          [
            {
              text: "Cancel",
              onPress: () => console.log("Cancel Pressed"),
              style: "cancel"
            },
            { text: "Edit", onPress: () =>navigation.navigate("editAnimal",{
              animal:animal
            }) ,style: "edit"}
          ]
        );
        }}
        icon={images.update}
        buttonContainerStyle={{
          height: 60,
          marginTop: SIZES.padding-10,
          marginHorizontal: SIZES.padding,
          marginBottom: SIZES.padding + 10,
          borderTopLeftRadius: SIZES.radius,
          borderTopRightRadius: SIZES.radius,
          backgroundColor: COLORS.Primary,
        }}
        label={'Edit Animal'}
        // loading={loading}
      />:null
    }
    </View>
  );
};
