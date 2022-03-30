import { View, Text,TouchableOpacity,Image,ScrollView } from 'react-native'
import React from 'react'
import { images,FONTS,SIZES, COLORS } from '../../Components/Constants';
import Header from '../../Components/Header'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import CustomButton from '../Home/CustomButtom';
function SubDetails({navigation,route}) {
    var active = false
    function renderheader() {
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
                    backgroundColor: COLORS.Primary,
                    height: 40,
                    width: 40,
                    justifyContent: 'center',
                    borderRadius: SIZES.base,
                  }}
                  onPress={() => {
                    navigation.goBack();
                  }}>
                  <Image
                    source={images.back}
                    style={{
                      width: 30,
                      height: 30,
                      tintColor: COLORS.white,
                      alignSelf: 'center',
                    }}
                  />
                </TouchableOpacity>
              </View>
            }
            title={"Details"}
          />
        );
      }
    function renderContent(){
        return(
            <View style={{
                backgroundColor:COLORS.lightGray2,
                // height:100,
                width:"88%",
                alignSelf:"center",
                borderRadius:SIZES.radius,
                marginTop:20,
            }}>
                <View style={{
                    flexDirection:"row",
                    justifyContent:"space-between"
                }}>
                <Text style={{
                ...FONTS.h2,
                marginTop:10,
                marginLeft:10,
                // color:active?COLORS.white:COLORS.black
            }}>{route.params.label}</Text>
            {
                active?<Image source={images.paid} style={{
                    height:50,
                    width:50,
                    marginLeft:65,
                    tintColor:COLORS.Primary,
                    margin:10
                }}/>:null
            }
            
        </View>
        {
            active?<>
            <Text style={{
                ...FONTS.h3,
                marginTop:10,
                marginLeft:10,
                // color:active?COLORS.white:COLORS.black
            }}>{`Start Date : 12-12-2001 `}</Text>
            <Text style={{
                ...FONTS.h3,
                marginTop:10,
                marginLeft:10,
                // color:active?COLORS.white:COLORS.black
            }}>{`End Date : 12-12-2001`}</Text>
            <Text style={{
                ...FONTS.h3,
                margin:10,
                // marginLeft:10,
                // color:active?COLORS.white:COLORS.black
            }}>{`Animal Count : 120/500`}</Text>
            </>:<>
            <Text style={{
                ...FONTS.h3,
                marginTop:10,
                marginLeft:10,
                // color:active?COLORS.white:COLORS.black
            }}>{`Price : $ 49.99 `}</Text>
            <Text style={{
                ...FONTS.h3,
                margin:10,
                // marginLeft:10,
                // color:active?COLORS.white:COLORS.black
            }}>{`Animal Count : 500 `}</Text>
            </>
        }
            </View>
        )
    }
    function renderTable(){
        return(
            <View style={{
                backgroundColor:COLORS.lightGray2,
                height:100,
                width:"88%",
                alignSelf:"center",
                borderRadius:SIZES.radius,
                marginTop:20,
                flexDirection:"row",
                
            }}>
                <View style={{
                    justifyContent:"center"
                }}>
                <Text style={{
                    ...FONTS.h2,
                    justifyContent:"center",
                    marginLeft:50
                    
                }}>
                    1
                </Text>
                
                </View>
                <View style={{
                    justifyContent:"center"
                }}>
                <Text style={{
                    ...FONTS.h2,
                    justifyContent:"center",
                    marginLeft:20

                    
                }}>
                    X
                </Text>
                
                </View>
                <View style={{
                    justifyContent:"center"
                }}>
                <Text style={{
                    ...FONTS.h2,
                    justifyContent:"center",
                    marginLeft:30

                    
                }}>
                    19.99
                </Text>
                
                </View>
                <View
            style={{
                height: 80,
                width: 1,
                backgroundColor: COLORS.Primary,
                justifyContent:"center",
                alignSelf:"center",
                marginLeft:20
            }}
        />
        <View style={{
                    justifyContent:"center"
                }}>
                <Text style={{
                    ...FONTS.h2,
                    justifyContent:"center",
                    marginLeft:10

                    
                }}>
                    $ 19.99
                </Text>
                
                </View>

            </View>
        )
    }
  return (
    <View style={{
        flex:1,
        backgroundColor:COLORS.white
    }}>
      {renderheader()}
      <KeyboardAwareScrollView
        showsVerticalScrollIndicator={false}
        keyboardDismissMode="interactive"
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{
          marginTop: SIZES.radius,
          paddingBottom: 40,
        }}>
      {renderContent()}
      {renderTable()}
      </KeyboardAwareScrollView>
      <CustomButton
        onPress={() => {
          navigation.navigate("Payment")
        }}
        icon={images.right}
        iconContainerStyle={{
            borderWidth:0
        }}
        buttonContainerStyle={{
          height: 60,
          marginTop: SIZES.padding,
          marginHorizontal: SIZES.padding,
          marginBottom: SIZES.padding + 10,
          borderRadius: SIZES.radius,
          backgroundColor: COLORS.Primary,
        }}
        label={active?'Renew':'Proceed'}
        label2={"$19.99"}
        labelStyle={{
            marginLeft:50
        }}
        buttonContainerStyle2={{
            width:100
        }}
      />
    </View>
  )
}
export default SubDetails;