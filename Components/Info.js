import {View, Text, TouchableOpacity, Image, ScrollView,Alert} from 'react-native';
import React from 'react';
import Header from './Header';
import {COLORS, SIZES, images, FONTS} from './Constants';
import InfoItem from './InfoItem';
import axiosIns from '../helpers/helpers';
import Status from './Status';
import TextButton from './TextButton';


export const Info = ({navigation, route}) => {
  const [animal, setAnimal] = React.useState([]);
  const [med, setMed] = React.useState([]);
  const [cond, setCond] = React.useState(false);
  const [show, setShow] = React.useState(false);
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2
  })
  async function getMedication(tag) {
    let {data} = await axiosIns.get(`getmedication/${tag}`);
    return data;
  }
  React.useEffect(() => {
    let {value} = route.params;
    let {cond} = route.params;
    getMedication(value.tag_number).then((data)=>{
      setMed(data)
    });
    setCond(cond);
    setAnimal(value);
    
  }, []);

  function renderSectionOne() {
    return (
      <View
        style={{
          marginTop: SIZES.padding,
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
  function renderSectionZero() {
    return (
      <View
        style={{
          marginTop: SIZES.padding,
          borderRadius: SIZES.radius,
          // paddingHorizontal: SIZES.radius,
          backgroundColor: COLORS.lightGray2,
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        <View
          style={{
            flexDirection: 'column',
            alignSelf: 'center',
            marginLeft: 65,
          }}>
          {cond ? (
            <Image
              source={{
                uri:
                  'https://api-herdhelp-nerdtech-q984k.ondigitalocean.app' +
                  animal?.image,
              }}
              style={{width: 80, height: 80, margin: 10, alignSelf: 'center'}}
            />
          ) : (
            <Image
              source={{uri: animal?.image}}
              style={{width: 80, height: 80, margin: 10, alignSelf: 'center'}}
            />
          )}
          <Text style={{alignSelf: 'center', ...FONTS.h3, paddingBottom: 10}}>
            ID: {animal?.support_tag}
          </Text>
        </View>
        <TouchableOpacity
          style={{
            backgroundColor: COLORS.Primary,
            height: 130,
            width: 80,
            borderRadius: SIZES.radius,
            marginLeft: 30,
            flexDirection: 'column',
            alignSelf:"center",
            justifyContent: 'space-evenly',
          }}
          onPress={() => {
            navigation.navigate('MedCard', {
              animal:animal
            });
          }}>
          <Image
            source={images.med}
            style={{
              width: 30,
              height: 30,
              tintColor: COLORS.white,
              alignSelf: 'center',
            }}
          />
          <View style={{flexDirection: 'column'}}>
            <Text
              style={{color: COLORS.white, ...FONTS.h3, alignSelf: 'center'}}>
              Med
            </Text>
            <Text
              style={{color: COLORS.white, ...FONTS.h3, alignSelf: 'center'}}>
              Details
            </Text>
          </View>
        </TouchableOpacity>
      </View>
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
  function medication() {
    return (
      <View
        style={{
          marginTop: SIZES.padding,
          borderRadius: SIZES.radius,
          paddingHorizontal: SIZES.radius,
          backgroundColor: COLORS.lightGray2,
          paddingBottom: SIZES.padding,
        }}>
        <InfoItem label="Breed" value={animal?.breed} withDivider={false}/>
        <InfoItem
          label="Bred"
          value={animal?.bred == false ? 'No' : 'Yes'}
        />
      </View>
    );
  }
  function Babies(){

    return(
    <TextButton
        buttonContainerStyle={{
          marginTop: SIZES.padding,
          borderRadius: SIZES.radius,
          paddingHorizontal: SIZES.radius,
          backgroundColor: COLORS.Primary,
          width:"100%"
        }}
        border={false}
        icon={images.right}
        label={"Babies"}
        label2={animal.children.length}
        buttonContainerStyle2={{
          height:30,
          width:30,
          backgroundColor:COLORS.white,
          justifyContent:"center",
          alignSelf:"center",
          padding:0,
          margin:5
        }}
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
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: SIZES.padding,
        }}>
        {renderSectionZero()}
        {renderSectionOne()}
        {
          animal.children?.length > 0?Babies():null
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
