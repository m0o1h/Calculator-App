import React,{useState, useRef} from "react";
import { View, Text, ScrollView, Pressable, Image, Animated } from "react-native";
import { ExternalStyle } from "../ExternalStyle";
import { Ionicons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useRecoilState } from "recoil";
import { globalVariable } from "../atoms/globalVariable";

const MainScreen = ()=>{
    const [value, setValue] = useState('0')
    const [bracketOpen, setBracketOpen] = useState(false)
    //const [darkModeOn, setDarkModeOn] = useState(false);
    const scrollViewRef = useRef();
    const [darkModeOn, setDarkModeOn] = useRecoilState(globalVariable)
    const animationWidthValue = useState(new Animated.Value(400))[0];
    const animationHeightValue = useState(new Animated.Value(600))[0];
    const opacity = useState(new Animated.Value(0))[0]; 
    const [calculatorMinimized, setCalculatorMinimized] = useState(false);

    const theme = () =>{
        if(darkModeOn=='false')
        setDarkModeOn('true')
        else
        setDarkModeOn('false')
        
    }

    const minimize_maximizeCalculator =()=>{
        if(calculatorMinimized==false){
            Animated.timing(animationWidthValue,{
                toValue:320,
                duration:200,
                useNativeDriver:false
            }).start()
    
            Animated.timing(animationHeightValue,{
                toValue:515,
                duration:200,
                useNativeDriver:false
            }).start()

            Animated.timing(opacity,{
                toValue:1,
                duration:200,
                useNativeDriver:false
            }).start()
            setCalculatorMinimized(true)
        }
        else{
            Animated.timing(animationWidthValue,{
                toValue:400,
                duration:200,
                useNativeDriver:false
            }).start()

            Animated.timing(animationHeightValue,{
                toValue:600,
                duration:200,
                useNativeDriver:false
            }).start()

            Animated.timing(opacity,{
                toValue:0,
                duration:200,
                useNativeDriver:false
            }).start()
            setCalculatorMinimized(false)
        }
    }

    const handelPress = (val) =>{
        console.log('Pressed', val)
        if(val=='AC'){
            setValue('0')
        }
        else if(val=='='){
            try {
                if((value.match(/\(/g) || []).length == (value.match(/\)/g) || []).length ){
                    if(value.slice(-1) == '+' || value.slice(-1) == '-' || value.slice(-1) == '*' 
                    || value.slice(-1) == '/' || value.slice(-1) == '%' || value.slice(-1) == '.' ){
                        setValue(`${eval(value.replace('()','(0)').slice(0, -1))}`)
                    }
                    else{
                        setValue(`${eval(value.replace('()','(0)'))}`)
                    }
                }
                
            } catch (error) {
                setValue('Format Error')
            }
        }
        else if(val=='back'){
            if(value=='0'){
                //setValue(value)
            }
            else{
                setValue(value.slice(0, -1))
            }
        }
        else if(val=='( )'){
            if(value == '0'){
                setValue('(')
                setBracketOpen(true)
            }
            else if( value.slice(-1) == '+' || value.slice(-1) == '-' || value.slice(-1) == '*' 
            || value.slice(-1) == '/' || value.slice(-1) == '%' || value.slice(-1) == '.' ){
                setValue(value + '(')
                setBracketOpen(true)
            }
            else{
                if(bracketOpen==true){
                    setValue(value + ')')
                    setBracketOpen(false)
                }
                else{
                    setValue(value + '(')
                    setBracketOpen(true)
                }
            }
        }
        else if(value == 'Format Error'){
            setValue(val)
        }
        else{
            if(value=='0'){
                if(isNaN(val)){
                    setValue(value + val)
                }
                else{
                    setValue(val)
                }
            }
            else if(isNaN(val)){
                if(value.slice(-1) == '+' || value.slice(-1) == '-' || value.slice(-1) == '*' 
                || value.slice(-1) == '/' || value.slice(-1) == '%' || value.slice(-1) == '.'){
                    setValue(value.slice(0,-1) + val)
                }
                else{
                    setValue(value + val)
                }
            }
            else{
                setValue(value + val)
            }
        }
    }
    return(
        <View style={{...ExternalStyle.main_Screen_Container,backgroundColor:darkModeOn=='true'?'black':'white'}} >
            <ScrollView ref={scrollViewRef} 
            style={{...ExternalStyle.input_Output_Field,backgroundColor:darkModeOn=='true'?'#171717':'white'}}
            onContentSizeChange={() => scrollViewRef.current.scrollToEnd({animated: true}) }
            >
                <Text style={{...ExternalStyle.input_Output_Field_Text,color:darkModeOn=='true'?'white':'black'}} >{value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</Text>
            </ScrollView>

            <View style={ExternalStyle.main_Screen_Keypad} >
               <View style={{width:'100%', flexDirection:'row'}} >
                    <Pressable 
                    onPress={theme} 
                    style={ExternalStyle.btn4_Outer} >
                    {darkModeOn =='false'?<Image source={{uri:'https://cdn-icons-png.flaticon.com/128/5126/5126014.png'}} style={{width:30, height:30}} ></Image>
                    :<Image source={{uri:'https://cdn-icons-png.flaticon.com/512/8637/8637690.png'}} style={{width:30, height:30}} ></Image>}
                    </Pressable>

                    <Pressable 
                    onPress={minimize_maximizeCalculator} 
                    style={ExternalStyle.btn4_Outer} >
                    <MaterialCommunityIcons name="calculator-variant" size={30} color={darkModeOn=='true'?'white':'black'} />
                    </Pressable>

                    <Pressable 
                    onPress={()=>{alert('Nothing to Show here.')}} 
                    style={ExternalStyle.btn4_Outer} >
                    <Ionicons name="settings" size={30} color={darkModeOn=='true'?'white':'black'} />                     
                    </Pressable>
                </View>

                <Animated.View style={{...ExternalStyle.main_Screen_Keypad_Row,
                    backgroundColor:darkModeOn=='true'?'black':'white',
                    width:animationWidthValue,
                    height:animationHeightValue,
                    alignSelf:calculatorMinimized?'flex-end':'auto',
                    marginTop:calculatorMinimized?'21.8%':'0%',
                    }} >

                    <Pressable style={ExternalStyle.btn1_Outer}
                        onPress={()=>handelPress('AC')}
                     >
                        <View >
                            <Text style={ExternalStyle.btn1_text} >AC</Text>
                        </View>
                    </Pressable>

                    <Pressable style={ExternalStyle.btn2_Outer} 
                    onPress={()=>handelPress('( )')}
                     >
                        <View >
                            <Text style={ExternalStyle.btn2_text} >( )</Text>
                        </View>
                    </Pressable>

                    <Pressable style={ExternalStyle.btn2_Outer}
                    onPress={()=>handelPress('%')}
                     >
                        <View  >
                            <Text style={ExternalStyle.btn2_text} >%</Text>
                        </View>
                    </Pressable>

                    <Pressable style={ExternalStyle.btn2_Outer}
                    onPress={()=>handelPress('/')}
                     >
                        <View  >
                            <Text style={ExternalStyle.btn2_text} >/</Text>
                        </View>
                    </Pressable>


                    <Pressable style={{...ExternalStyle.btn3_Outer,backgroundColor:darkModeOn=='true'?'#171717':'white'}}
                    onPress={()=>handelPress('7')}
                     >
                        <View  >
                            <Text style={{...ExternalStyle.btn3_text,color:darkModeOn=='true'?'white':'#171717'}} >7</Text>
                        </View>
                    </Pressable>

                    <Pressable style={{...ExternalStyle.btn3_Outer,backgroundColor:darkModeOn=='true'?'#171717':'white'}}
                    onPress={()=>handelPress('8')}
                     >
                        <View  >
                            <Text style={{...ExternalStyle.btn3_text,color:darkModeOn=='true'?'white':'#171717'}} >8</Text>
                        </View>
                    </Pressable>

                    <Pressable style={{...ExternalStyle.btn3_Outer,backgroundColor:darkModeOn=='true'?'#171717':'white'}}
                    onPress={()=>handelPress('9')}
                     >
                        <View  >
                            <Text style={{...ExternalStyle.btn3_text,color:darkModeOn=='true'?'white':'#171717'}} >9</Text>
                        </View>
                    </Pressable>

                    <Pressable style={ExternalStyle.btn2_Outer}
                    onPress={()=>handelPress('*')}
                     >
                        <View  >
                            <Text style={ExternalStyle.btn2_text} >×</Text>
                        </View>
                    </Pressable>

                    <Pressable style={{...ExternalStyle.btn3_Outer,backgroundColor:darkModeOn=='true'?'#171717':'white'}}
                    onPress={()=>handelPress('4')}
                     >
                        <View  >
                            <Text style={{...ExternalStyle.btn3_text,color:darkModeOn=='true'?'white':'#171717'}} >4</Text>
                        </View>
                    </Pressable>

                    <Pressable style={{...ExternalStyle.btn3_Outer,backgroundColor:darkModeOn=='true'?'#171717':'white'}}
                    onPress={()=>handelPress('5')}
                     >
                        <View  >
                            <Text style={{...ExternalStyle.btn3_text,color:darkModeOn=='true'?'white':'#171717'}} >5</Text>
                        </View>
                    </Pressable>

                    <Pressable style={{...ExternalStyle.btn3_Outer,backgroundColor:darkModeOn=='true'?'#171717':'white'}}
                    onPress={()=>handelPress('6')}
                     >
                        <View  >
                            <Text style={{...ExternalStyle.btn3_text,color:darkModeOn=='true'?'white':'#171717'}} >6</Text>
                        </View>
                    </Pressable>

                    <Pressable style={ExternalStyle.btn2_Outer}
                    onPress={()=>handelPress('-')}
                     >
                        <View  >
                            <Text style={ExternalStyle.btn2_text} >-</Text>
                        </View>
                    </Pressable>

                    <Pressable style={{...ExternalStyle.btn3_Outer,backgroundColor:darkModeOn=='true'?'#171717':'white'}}
                    onPress={()=>handelPress('1')}
                     >
                        <View  >
                            <Text style={{...ExternalStyle.btn3_text,color:darkModeOn=='true'?'white':'#171717'}} >1</Text>
                        </View>
                    </Pressable>

                    <Pressable style={{...ExternalStyle.btn3_Outer,backgroundColor:darkModeOn=='true'?'#171717':'white'}}
                    onPress={()=>handelPress('2')}
                     >
                        <View  >
                            <Text style={{...ExternalStyle.btn3_text,color:darkModeOn=='true'?'white':'#171717'}} >2</Text>
                        </View>
                    </Pressable>

                    <Pressable style={{...ExternalStyle.btn3_Outer,backgroundColor:darkModeOn=='true'?'#171717':'white'}}
                    onPress={()=>handelPress('3')}
                     >
                        <View  >
                            <Text style={{...ExternalStyle.btn3_text,color:darkModeOn=='true'?'white':'#171717'}} >3</Text>
                        </View>
                    </Pressable>

                    <Pressable style={ExternalStyle.btn2_Outer}
                    onPress={()=>handelPress('+')}
                     >
                        <View  >
                            <Text style={ExternalStyle.btn2_text} >+</Text>
                        </View>
                    </Pressable>

                    <Pressable style={{...ExternalStyle.btn3_Outer,backgroundColor:darkModeOn=='true'?'#171717':'white'}}
                    onPress={()=>handelPress('0')}
                     >
                        <View  >
                            <Text style={{...ExternalStyle.btn3_text,color:darkModeOn=='true'?'white':'#171717'}} >0</Text>
                        </View>
                    </Pressable>

                    <Pressable style={{...ExternalStyle.btn3_Outer,backgroundColor:darkModeOn=='true'?'#171717':'white'}}
                    onPress={()=>handelPress('.')}
                     >
                        <View  >
                            <Text style={{...ExternalStyle.btn3_text,color:darkModeOn=='true'?'white':'#171717'}} >.</Text>
                        </View>
                    </Pressable>

                    <Pressable style={ExternalStyle.btn1_Outer}
                    onPress={()=>handelPress('back')}
                     >
                        <View  >
                            <Ionicons name="backspace" size={30} color="white" />
                        </View>
                    </Pressable>

                    <Pressable style={ExternalStyle.btn2_Outer}
                    onPress={()=>handelPress('=')}
                     >
                        <View  >
                            <Text style={ExternalStyle.btn2_text} >=</Text>
                        </View>
                    </Pressable>
                </Animated.View>

                <Animated.View style={{flexDirection:'column', position:calculatorMinimized?'absolute':'relative', display:'flex', marginLeft:11, marginTop:40, opacity}} >
                    <Pressable style={{...ExternalStyle.btn5_Outer, backgroundColor:darkModeOn=='true'?'white':'#171717'}}
                    onPress={()=>handelPress('xⁿ')}
                     >
                        <View  >
                            <Text style={{...ExternalStyle.btn5_text,color:darkModeOn=='true'?'#171717':'white'}} >xⁿ</Text>
                        </View>
                    </Pressable>

                    <Pressable style={{...ExternalStyle.btn5_Outer, backgroundColor:darkModeOn=='true'?'white':'#171717'}}
                    onPress={()=>handelPress('x²')}
                     >
                        <View  >
                            <Text style={{...ExternalStyle.btn5_text,color:darkModeOn=='true'?'#171717':'white'}}>x²</Text>
                        </View>
                    </Pressable>

                    <Pressable style={{...ExternalStyle.btn5_Outer, backgroundColor:darkModeOn=='true'?'white':'#171717'}}
                    onPress={()=>handelPress('π')}
                     >
                        <View  >
                            <Text style={{...ExternalStyle.btn5_text,color:darkModeOn=='true'?'#171717':'white'}}>π</Text>
                        </View>
                    </Pressable>

                    <Pressable style={{...ExternalStyle.btn5_Outer, backgroundColor:darkModeOn=='true'?'white':'#171717'}}
                    onPress={()=>handelPress('!')}
                     >
                        <View  >
                            <Text style={{...ExternalStyle.btn5_text,color:darkModeOn=='true'?'#171717':'white'}}>x!</Text>
                        </View>
                    </Pressable>

                    {/* <Pressable style={{...ExternalStyle.btn5_Outer, backgroundColor:darkModeOn=='true'?'white':'#171717'}}
                    onPress={()=>handelPress('back')}
                     >
                        <View  >
                            <Ionicons name="backspace" size={30} color="white" />
                        </View>
                    </Pressable> */}

                    <Pressable style={{...ExternalStyle.btn5_Outer, backgroundColor:darkModeOn=='true'?'white':'#171717'}}
                    onPress={()=>handelPress('ln')}
                     >
                        <View  >
                            <Text style={{...ExternalStyle.btn5_text,color:darkModeOn=='true'?'#171717':'white'}} >ln</Text>
                        </View>
                    </Pressable>
                    <Pressable style={{...ExternalStyle.btn5_Outer, backgroundColor:darkModeOn=='true'?'white':'#171717'}}
                    onPress={()=>handelPress('√')}
                     >
                        <View  >
                            <Text style={{...ExternalStyle.btn5_text,color:darkModeOn=='true'?'#171717':'white'}} >√</Text>
                        </View>
                    </Pressable>
                </Animated.View>

                <Animated.View style={{flexDirection:'row', position:calculatorMinimized?'absolute':'relative', display:'flex', marginLeft:83, marginTop:44, opacity,}} >

                    <Pressable style={{...ExternalStyle.btn6_Outer, backgroundColor:darkModeOn=='true'?'white':'#171717'}}
                    onPress={()=>handelPress('log')}
                     >
                        <View  >
                            <Text style={{...ExternalStyle.btn5_text,color:darkModeOn=='true'?'#171717':'white'}}>log</Text>
                        </View>
                    </Pressable>

                    <Pressable style={{...ExternalStyle.btn6_Outer, backgroundColor:darkModeOn=='true'?'white':'#171717'}}
                    onPress={()=>handelPress('sin')}
                     >
                        <View  >
                            <Text style={{...ExternalStyle.btn5_text,color:darkModeOn=='true'?'#171717':'white'}}>sin</Text>
                        </View>
                    </Pressable>

                    <Pressable style={{...ExternalStyle.btn6_Outer, backgroundColor:darkModeOn=='true'?'white':'#171717'}}
                    onPress={()=>handelPress('cos')}
                     >
                        <View  >
                            <Text style={{...ExternalStyle.btn5_text,color:darkModeOn=='true'?'#171717':'white'}} >cos</Text>
                        </View>
                    </Pressable>

                    <Pressable style={{...ExternalStyle.btn6_Outer, backgroundColor:darkModeOn=='true'?'white':'#171717'}}
                    onPress={()=>handelPress('tan')}
                     >
                        <View  >
                            <Text style={{...ExternalStyle.btn5_text,color:darkModeOn=='true'?'#171717':'white'}} >tan</Text>
                        </View>
                    </Pressable>
                </Animated.View>
            </View>
        </View>
    )
}

export default MainScreen;