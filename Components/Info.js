import {View, Text, TouchableOpacity, Image, ScrollView} from 'react-native';
import React from 'react';
import Header from './Header';
import {COLORS, SIZES, images, FONTS} from './Constants';
import InfoItem from './InfoItem';
import axiosIns from '../helpers/helpers';
import Status from './Status';
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
          value={`${animal?.weight} lbs`}
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
              medication: med,
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
            label="vaccination Date"
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
            label="registration"
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

    return(<TouchableOpacity
        style={{
          marginTop: SIZES.padding,
          borderRadius: SIZES.radius,
          paddingHorizontal: SIZES.radius,
          backgroundColor: COLORS.lightGray2,
          // paddingBottom: SIZES.padding,
        }}
        onPress={()=>{
          navigation.navigate('Babies', {
            label: "Babies",
            data: animal.children,
            cond:true
          });
        }}
        >
        <InfoItem label="Babies" value={animal.children.length}/>
        {/* {animal.children?.map((a,index)=>(
          <InfoItem  key={index} label={a.tag_number} value={a.birth_date} />
        ))} */}
        </TouchableOpacity>)
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
                borderRadius:SIZES.base,
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
          marginLeft:cond?100:0
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
          >EDIT</Text>
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
    </View>
  );
};
