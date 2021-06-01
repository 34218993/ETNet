/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import XLSX from 'xlsx';
import {
  SafeAreaView,
  ScrollView,
  FlatList,
  StyleSheet,
  Text,
  View,
  Alert,
} from 'react-native';
import RNFS from 'react-native-fs';
import myResource from './data.json';

const input = res => res;
const output = str => str;
const make_cols = refstr =>
  Array.from({length: XLSX.utils.decode_range(refstr).e.c + 1}, (x, i) =>
    XLSX.utils.encode_col(i),
  );
const make_width = refstr =>
  Array.from({length: XLSX.utils.decode_range(refstr).e.c + 1}, () => 60);

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      DATA1: [
        {
          text: 'HKD',
          category: 'a1',
        },
        {
          currentPrice: 0,
          increment: '+0.020',
          incrementPercent: '(+1.23%)',
          category: 'a1',
        },
        {
          title: '高',
          text: '1.670',
          category: 'a2',
        },
        {
          title: '開',
          text: '1.670',
          category: 'a2',
        },
        {
          title: '低',
          text: '1.620',
          category: 'a2',
        },
        {
          title: '前',
          text: '1.620',
          category: 'a2',
        },
      ],
      DATA2: [
        {
          title1: '成交金額',
          title2: '成交股數',
          text1: '92.00K',
          text2: '56.06K',
          category: 'b',
        },
        {
          title1: '交易宗數',
          title2: '每手股數',
          text1: '21',
          text2: '2000',
          category: 'c',
        },
        {
          title1: '買賣差價',
          title2: '入場費',
          text1: '0.010/0.010',
          text2: '3280',
          category: 'b',
        },
        {
          title1: '帳面淨值',
          title2: '每股派息',
          text1: 'HKD 2.109',
          text2: 'HKD 0.085',
          category: 'c',
        },
        {
          title1: '市盈率',
          title2: '周息率',
          text1: '9.90',
          text2: '5.18%',
          category: 'b',
        },
        {
          title1: '預測市盈',
          title2: '預測息率',
          text1: '',
          text2: '',
          category: 'c',
        },
        {
          title1: '1個月高',
          title2: '52周高',
          text1: '1.700',
          text2: '1.750',
          category: 'b',
        },
        {
          title1: '1個月低',
          title2: '52周低',
          text1: '1.550',
          text2: '1.240',
          category: 'c',
        },
        {
          title1: '14天RSI',
          title2: '10天平均',
          text1: '46.732',
          text2: '1.617',
          category: 'b',
        },
        {
          title1: '市值',
          title2: '20天平均',
          text1: '707.82M',
          text2: '',
          category: 'c',
        },
        {
          title1: '14天RSI',
          title2: '10天平均',
          text1: '46.732',
          text2: '1.617',
          category: 'b',
        },
        {
          title1: '沽空(上午)',
          title2: '50天平均',
          text1: '',
          text2: '',
          category: 'c',
        },
        {
          title1: '沽空%',
          title2: '250天平均',
          text1: '',
          text2: '',
          category: 'b',
        },
        {
          title1: '沽空(上午)',
          title2: '50天平均',
          text1: '',
          text2: '',
          category: 'c',
        },
        {
          title1: '沽空%',
          title2: '250天平均',
          text1: '',
          text2: '',
          category: 'b',
        },
        {
          title1: '沽空(上午)',
          title2: '50天平均',
          text1: '',
          text2: '',
          category: 'c',
        },
      ],
      widthArr: [60, 60, 60],
      cols: make_cols('A1:C2'),
    };
    this.importFile = this.importFile.bind(this);
  }

  componentDidMount() {
    let counter = 0;
    this.interval = setInterval(() => {
      if (counter < 5) {
        this.importFile(counter);
        counter++;
      }
    }, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  importFile(counter) {
    /* update state */
    console.log(this.state.DATA1[1].currentPrice);
    this.setState({
      DATA1: this.state.DATA1.map((obj, index) =>
        index === 1
          ? Object.assign(obj, {currentPrice: myResource[counter]})
          : obj,
      ),
    });
  }

  render() {
    const ItemA = ({
      title,
      text,
      currentPrice,
      increment,
      incrementPercent,
    }) => (
      <View style={styles.itemA}>
        {currentPrice ? (
          <View style={styles.itemAUpperWrapper}>
            <Text style={styles.currentPriceSymbol}>▴</Text>
            <Text style={styles.currentPriceText}>{currentPrice}</Text>
          </View>
        ) : (
          <View />
        )}

        {increment ? (
          <View style={styles.incrementWrapper}>
            <Text style={styles.incrementText}>{increment}</Text>
            <Text style={styles.incrementText}>{incrementPercent}</Text>
          </View>
        ) : (
          <View />
        )}
        <View style={styles.itemALowerWrapper}>
          <Text style={styles.titleA}>{title}</Text>
          <Text style={styles.textA}>{text}</Text>
        </View>
      </View>
    );

    const ItemB = ({title1, title2, text1, text2}) => (
      <View style={styles.itemB}>
        <Text style={styles.titleB1}>{title1}</Text>
        <Text style={styles.textB1}>{text1}</Text>
        <Text style={styles.titleB2}>{title2}</Text>
        <Text style={styles.textB2}>{text2}</Text>
      </View>
    );

    const ItemC = ({title1, title2, text1, text2}) => (
      <View style={styles.itemC}>
        <Text style={styles.titleC1}>{title1}</Text>
        <Text style={styles.textC1}>{text1}</Text>
        <Text style={styles.titleC2}>{title2}</Text>
        <Text style={styles.textC2}>{text2}</Text>
      </View>
    );

    const make_cols = refstr =>
      Array.from({length: XLSX.utils.decode_range(refstr).e.c + 1}, (x, i) =>
        XLSX.utils.encode_col(i),
      );

    const renderItemA = ({item}) => (
      <ItemA
        title={item.title}
        text={item.text}
        currentPrice={item.currentPrice}
        increment={item.increment}
        incrementPercent={item.incrementPercent}
      />
    );

    const renderItemBOrC = ({item}) =>
      item.category === 'b' ? (
        <ItemB
          title1={item.title1}
          text1={item.text1}
          title2={item.title2}
          text2={item.text2}
        />
      ) : (
        <ItemC
          title1={item.title1}
          text1={item.text1}
          title2={item.title2}
          text2={item.text2}
        />
      );
    return (
      <SafeAreaView>
        <View style={styles.topView}>
          <View style={styles.textWrapper}>
            <Text style={styles.numberText}>00423</Text>
          </View>
          <View style={styles.chinesetextWrapper}>
            <Text style={styles.chineseText}>經濟日報集團</Text>
          </View>
        </View>

        <ScrollView
          style={styles.contentView}
          contentInsetAdjustmentBehavior="automatic">
          <FlatList
            data={this.state.DATA1}
            renderItem={renderItemA}
            numColumns={2}
            keyExtractor={item => item.id}
          />
          <FlatList
            data={this.state.DATA2}
            renderItem={renderItemBOrC}
            numColumns={1}
            keyExtractor={item => item.id}
          />
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  topView: {
    height: '5%',
    width: '100%',
    backgroundColor: '#152238',
    borderColor: '#6699cc',
    flexDirection: 'row',
    borderBottomWidth: 2,
  },
  textWrapper: {
    height: '74%',
    width: '20%',
    flexDirection: 'column',
    backgroundColor: '#696969',
    borderColor: '#6699cc',
    borderWidth: 2,
    borderRadius: 3,
    marginLeft: 5,
    marginTop: 3,
    alignItems: 'center',
    justifyContent: 'center',
  },
  chinesetextWrapper: {
    width: '28%',
    flexDirection: 'column',
    marginLeft: 5,
    marginBottom: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  numberText: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#FFF',
  },
  chineseText: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#FFF',
  },
  contentView: {
    height: '100%',
    backgroundColor: '#152238',
  },
  container: {
    flex: 1,
    marginTop: 0,
  },
  itemA: {
    marginVertical: 2,
    marginHorizontal: 16,
  },
  titleA: {
    fontSize: 18,
    color: '#187bcd',
  },
  textA: {
    fontSize: 18,
    color: '#187bcd',
    bottom: 2,
  },
  itemB: {
    flex: 1,
    backgroundColor: '#4A4A50',
    flexDirection: 'row',
    marginVertical: 8,
    marginHorizontal: 1,
  },
  itemC: {
    flexDirection: 'row',
    marginVertical: 8,
    marginHorizontal: 1,
  },
  titleB1: {
    marginRight: 10,
    textAlign: 'left',
    fontSize: 18,
    color: '#187bcd',
  },
  textB1: {
    left: 5,
    fontWeight: 'bold',
    textAlign: 'right',
    fontSize: 18,
    color: '#fff',
  },
  titleB2: {
    justifyContent: 'flex-start',
    marginLeft: 25,
    textAlign: 'left',
    fontSize: 18,
    color: '#187bcd',
  },
  textB2: {
    left: 10,
    fontWeight: 'bold',
    textAlign: 'right',
    fontSize: 18,
    color: '#fff',
  },
  titleC1: {
    marginRight: 10,
    textAlign: 'left',
    fontSize: 18,
    color: '#187bcd',
  },
  textC1: {
    left: 5,
    fontWeight: 'bold',
    textAlign: 'right',
    fontSize: 18,
    color: '#fff',
  },
  titleC2: {
    marginLeft: 25,
    textAlign: 'left',
    fontSize: 18,
    color: '#187bcd',
  },
  textC2: {
    left: 5,
    fontWeight: 'bold',
    textAlign: 'right',
    fontSize: 18,
    color: '#fff',
  },
  currentPriceText: {
    top: 10,
    fontSize: 38,
    color: '#33FF00',
    fontWeight: 'bold',
  },
  currentPriceSymbol: {
    right: 30,
    fontSize: 58,
    color: '#33FF00',
    fontWeight: 'bold',
  },
  incrementWrapper: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  incrementText: {
    fontSize: 22,
    color: '#33FF00',
    right: 55,
  },
  itemAUpperWrapper: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  itemALowerWrapper: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
});

export default App;
