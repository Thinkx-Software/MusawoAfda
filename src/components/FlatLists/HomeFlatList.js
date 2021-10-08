import { useNavigation } from '@react-navigation/native';
import React,{useState} from 'react'
import { StyleSheet, Text, View, FlatList, Pressable, Image } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { constantstyles } from '../../constants/constanstStyles';
import { getAllLabServives } from '../../redux/slices/userSlice/actions';
import { clearCancelRequest, clearRequestedLabService} from '../../redux/slices/userSlice/userSlice';
import { theme } from '../../theme';

 
const data = [
    {
        id:1,
        image:"https://t3.ftcdn.net/jpg/02/47/51/44/240_F_247514487_C68D4H1uiW0T79h9Iep2AV2dKE2xtIqw.jpg",
        name:"Beside Nursing",
        role:"Nurse"
    },
    {    id:2,
        image:"https://img.freepik.com/free-vector/doctor-character-background_1270-84.jpg?size=338&ext=jpg",
        name:"Drs Review",
        role:"Doctor"
    },
    {   id:3,
        image:"https://t4.ftcdn.net/jpg/00/86/58/29/240_F_86582968_bIbgAHHkPIf6kCeW9cSZDuJWrCPiZjc1.jpg",
        name:"Physiotherapys",
        role:"physiologist "
    },
    {     id:4,
        image:"https://t3.ftcdn.net/jpg/02/65/26/58/240_F_265265863_un0bhCEHTAdYBsB88rFTbdnDQbbjbU0L.jpg",
        name:"Laboratory",
        role:"Technician"
    },

]


const HomeFlatList = () => {
    

    const navigation = useNavigation();
    const dispatch = useDispatch()

    
    return (
        
        <FlatList
            data={data}
            keyExtractor={item =>String(item.id)}
             numColumns={2}
             showsVerticalScrollIndicator={false}
             ListHeaderComponent={
                 <View style={[constantstyles.elevatedCard, constantstyles.centerContent, {marginHorizontal:10,marginTop:10 }]}>
                     <Text style={{ color:theme.colors.primary, fontSize:17 }}>Select Service</Text>
                 </View>
             }
            renderItem={({ item, index }) => {

                return (
                    <Pressable
                     style={{ 
                        width: theme.dimensions.width/2.5,
                        height: 170,
                        marginHorizontal:10,
                        marginVertical:15,
                        padding:5,


                      }}
                      onPress={()=>
                        {     
                            if(item.name == 'Laboratory'){
                                 //dispatch 
                                  dispatch(getAllLabServives())
                                  dispatch(clearRequestedLabService())
                                navigation.navigate('LabServices')
                               
                            }
                            else{
                                dispatch(clearCancelRequest())
                                navigation.navigate("SelectedService",{
                                    service:item
                                })
                            }
                              
                        }
                        
                    }
                    >
                        {/*image */}
                        <View>
                            <Image
                              source={{ uri:item.image }}
                              style={{
                                width: theme.dimensions.width/2.6,
                                height:150,
                                borderRadius: 10,
                                borderWidth: 0,
                                borderColor: `${theme.colors.placeholder}`,
                                opacity: 0.9,
                                backgroundColor:"black"
                            }}
                            resizeMode="cover"
                            />
                        </View>
                        {/*image */}

                        {/*name */}
                        <View style={[constantstyles.resideViews, constantstyles.flexStyles, constantstyles.centerContent, ]}>
                         
                            <Text style={{ color:theme.colors.primary, fontSize:15 }}>
                                {item.name}
                            </Text>
                        </View>
                        {/*name */}
                    </Pressable>
                )
            }}
        />

    )
}

export default HomeFlatList

const styles = StyleSheet.create({
    
})
