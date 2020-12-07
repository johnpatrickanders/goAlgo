[Live Link](https://jpa-goalgo.herokuapp.com/)

## Features 
- [Features Overview](#Features-Overview)
- [Landing Page With Brief Explanation of Algorithms](#Landing-Page-With-Brief-Explanation-of-Algorithms)
- [Sorting Algorithms](#Sorting-Algorithms)
- [Dynamically generated stockcharts candlestick graph](#Dynamically-generated-stockcharts-candlestick-graph)
   - Coingecko stocks API integration
- [Crypto currency buying power simulator](#Crypto-currency-buying-power-simulator)


## Technologies 
- React.js
- Vanilla CSS, Keyframes
- JavaScript

## Installation
1. Clone the repository
   ```bash
   $ git clone https://github.com/johnpatrickanders/goAlgo
   ```
2. Install dependencies
   ```bash
   $ npm install
   ```
3. Activate python shell and seed database
   ```bash
   $ npm start
   ```


## Features Overview

goAlgo is a visualizer for sorting and pathfinding algorithms. Major features are highlighted below, and the app has potenitial for adding further sorting and pathfinding algorithms, further explanation breaking down each algorithm, or even visualizing data structures.

> Current Status: ongoing development

### Landing Page With Brief Explanation of Algorithms
***
![](readmeImages/landing.gif)

The landing page displays a brief CSS animation that provides a very fundamental and accessible definition of what an algorithm is. This explanation is geared toward beginners. The animations are done using CSS keyframes.

### Sorting Algorithms
***
Once the introductory animation on the landing page completes, you may click on the logo to be taken to the sorting algorithms page. Bubble Sort, Quick Sort, Merge Sort, and Insertion Sort are currently available for animation. The animation consists of an array of HTML divs whose heights are dependent upon a randomly generated array of integers. Upon the user's click, the array is sorted with the selected algorithm, framed, and then reinterpreted for the DOM. Using AJAX calls allows the DOM to "animate" the split-second calculations just described at the interval the user provides.

 ![purchases](readmeImages/sorting.png)


### Pathfinding Algorithms
***

Pathfinding algorithms

![](readmeImages/pathfinding.gif)

The data from the graph is fetched in the backend using a `PUT` request from the `getCoinDetails` thunk to route `/api/coins` which pings the api. An api wrapper is used query the api in two seperate transactions to retrieve general coin information (`cg.get_coin_by_id`) as well as historical market data for the coin (`cg.get_coin_ohlc_by_id`). Both responses are formatted and placed on one object to be easily incorporated into one slice of state in redux store (`data = {**coin_data, "chart_data": chart_data}`) 

```py
@coin_routes.route("/", methods=["PUT"])
def coin():
    coin_id, days, vs_currency = request.json.values()

    coin_data = cg.get_coin_by_id(
        id=coin_id,
        localization="false",
        tickers="false",
        market_data="true",
        community_data="false",
        developer_data="false",
        sparkline="false",
    )

    chart_data = cg.get_coin_ohlc_by_id(id=coin_id, vs_currency=vs_currency, days=days)

    data = {**coin_data, "chart_data": chart_data}

    res = {
        "description": data["description"]["en"],
        "id": data["id"],
        "name": data["name"],
        "symbol": data["symbol"],
        "current_price_usd": data["market_data"]["current_price"],
        "percent_change_usd": data["market_data"][
            "market_cap_change_percentage_24h_in_currency"
        ],
        "price_change_usd": data["market_data"]["price_change_24h_in_currency"],
        "chart_data": data["chart_data"],
    }
    return res
```

The stockcharts candlestick graph requires properly formatted csv data. After the data object containing coin data and chart data is sent back to the getCoinDetail thunk, the data is converted to csv object using the `DataToCsv` function. 

```js
//getCoinDetail thunk

if (response.status >= 200 && response.status < 400) {
                const data = await response.json();
                data.chart_data = DataToCsv(data.chart_data)
                //new formatted data is dispatched to redux store
                dispatch(receiveCoinDetails(data))
            } else {
                console.error('Bad response');
            }
```

```js
//util.js

function parseData2() {
	return function(d) {
        d.date = new Date(d.date)
        d.open = +d.open *100;
		d.high = +d.high *100;
		d.low = +d.low *100;
		d.close = +d.close *100;
		return d;
	};
}

//parsing the date to the correct format for the candlestickchart
export function DataToCsv(data){
	//extracting the correct data from the chart data json object fetched from the api
	const alteredFetchedData = data.map(marketData => {
		return {
		  date: new Date(marketData[0]) + ''.split('T')[0],
		  open: marketData[1],
		  high: marketData[2],
		  low: marketData[3],
		  close: marketData[4]
		}
	  })

	//creating fields for csv data format
	const fields2 = ["date", "high","low", "open", "close"]
	//creating a new instance of csv data with the formatted fields
	const json2csvParser2 = new Parser({fields2})
	const csv2 = json2csvParser2.parse(alteredFetchedData)
	//returning the csv data into formatted objects the chart can use for data inputs
	return csvParse(csv2, parseData2())

}

```

### Crypto currency buying power simulator
***
The buying power simulator allows the user to purchase and sell cryto currencies. We had in mind additional simulation features to scale it up including networth calculations, list displaying all purchased currencies, and the ability to add more money into the bank. The simulation dynamically updates the cash in the user slice of state as well as updating the user's cash and purchase history in the database. 

![](readmeImages/buyingPower.gif)

The `BuyingPower` component calculates the total qty a user has of a paticular cryptocurrency upon mounting, symbol (currency page) change, or update in purchase history by subscribing to the purchase history slice of state. The purchaes history model hold positive values for purchases and negative values for sold currencies so the reducer is used to determine the difference which returns the current quantity possesed. 

```js
useEffect(() => {
   const getPurchaseQty = () => {
      const foundPurchases = purchases.filter(purchase => purchase.tickerSymbol === symbol)
      if (foundPurchases.length > 0) {
            const totalQtyOfPurchase = foundPurchases.reduce((acc, curr) => {
               return acc + curr.purchaseQuantity
            }, 0)

            //return qty with 1 decimal place
            setQtyOfPurchase(Number((totalQtyOfPurchase).toFixed(1)))
      } else {
            setQtyOfPurchase(0)
      }
   }
   return getPurchaseQty()
}, [symbol, purchases])
```

The buying power modal will disable the buy button if the user is out of money or the user doesn't have enough money to purchase atleat one qty. The sell button is disabled if the user doesn't have any amount of the particular crypto currency to sell.

```js
<DialogActions>
   {/* disable buy button if there is no money in the bank or if the user doen't have enough money to buy atleast qty of 1 */}
   {bank == 0 || maxQtyToPurchase === 0 ? 
   <Button onClick={buy} disabled={true} color="primary">
   Buy
   </Button>:
   <Button onClick={buy} color="primary">
   Buy
   </Button>}

   {/*disable sell button if purchase qty is 0 */}
   {qtyOfPurchase > 0 ? <Button onClick={sell} color="primary" autoFocus>
      Sell
      </Button> :
      <Button onClick={sell} disabled={true} color="primary" autoFocus>
            Sell
      </Button>}
</DialogActions>
```


#goAlgo
Sorting Algorithm visualizer, for helping Software Engineering Students understand and nail common algorithms.

##User Stories
As a software engineering student, I want to be able visualize common sorting algorithms in order to understand them at a high level.

##Features - MVP
 Merge Sort
 Generate New Array button
 Sort button
 Quick Sort, Merge Sort, Bubble Sort, Insertion Sort Algorithm Visualizations

####Backlog
 Sliding scale for changing array size and speed
 Translation to different languages
 Darkmode
 User comments below each Algo sorted by newest
 Up/Downvoting like Reddit

Frontend Routes
TODO
Components
Components to be organized as follows:

TODO
