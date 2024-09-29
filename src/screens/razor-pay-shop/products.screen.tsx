import {Alert, FlatList, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Appbar, Card, Text, Button, Icon} from 'react-native-paper';
import axios from 'axios';
import {wp} from '../../utils/helper/dimensions';
import {goBack} from '../../utils/helper/RootNavigation';
import RazorpayCheckout from 'react-native-razorpay';
type Props = {};

const ProductListPage = (props: Props) => {
  const [products, setProducts] = useState<any[]>([]);
  const getProductList = () => {
    axios
      .get('https://dummyjson.com/products')
      .then(res => {
        setProducts(res?.data?.products);
        console.group(res?.data?.products[0]);
      })
      .catch(err => {
        console.log(err);
      });
  };
  const createOrder = async (
    price: number,
    des: string,
    img: string,
    title: string,
  ) => {
    let response = await axios.post('http://10.0.2.2:1337/razorpay', {
      amount: price * 100,
    });
    let options = {
      description: des,
      image: img, //require('../../images.png')
      currency: 'INR', //In USD - only card option will exist rest(like wallet, UPI, EMI etc) will hide
      key: response?.data?.apiKey,
      amount: response?.data?.amount,
      name: title,
      order_id: response?.data?.id, //Replace this with an order_id(response.data.orderId) created using Orders API.
      prefill: {
        email: 'hasan@example.com',
        contact: '9191919191',
        name: 'Hasan',
      }, //if prefill is not provided then on razorpay screen it has to be manually entered.
      theme: {color: '#53a20e'},
    };
    RazorpayCheckout.open(options)
      .then((data: any) => {
        // handle success
        Alert.alert(`Success: ${data.razorpay_payment_id}`);
      })
      .catch(error => {
        // handle failure
        Alert.alert(`Error: ${error.code} | ${error.description}`);
      });
  };

  useEffect(() => {
    getProductList();
  }, []);
  const _goBack = () => goBack();

  const _handleSearch = () => console.log('Searching');

  const _handleMore = () => console.log('Shown more');
  return (
    <View>
      <Appbar.Header>
        <Appbar.BackAction onPress={_goBack} />
        <Appbar.Content title="Products" />
        <Appbar.Action icon="magnify" onPress={_handleSearch} />
        <Appbar.Action icon="dots-vertical" onPress={_handleMore} />
      </Appbar.Header>
      <FlatList
        data={products}
        numColumns={2}
        renderItem={({index, item}) => {
          return (
            <Card
              style={{
                padding: wp(3),
                margin: wp(1),
                alignSelf: 'center',
                width: wp(48),
              }}>
              <Card.Title title={item?.title} titleNumberOfLines={2} />
              <Card.Cover
                source={{uri: item?.images?.[0]}}
                resizeMode="contain"
              />
              <Card.Content>
                <Text variant="titleLarge">₹ {item?.price}</Text>
                <Text variant="bodyMedium">
                  {Math.floor(item?.rating * 10) / 10}{' '}
                  <Icon source={'star'} size={15} />
                </Text>
              </Card.Content>
              <Card.Actions
                style={{
                  alignSelf: 'center',
                }}>
                <Button>View</Button>
                <Button
                  onPress={() =>
                    createOrder(
                      item?.price,
                      item?.description,
                      item?.images?.[0],
                      item?.title,
                    )
                  }>
                  Buy
                </Button>
              </Card.Actions>
            </Card>
          );
        }}
      />
    </View>
  );
};

export default ProductListPage;
