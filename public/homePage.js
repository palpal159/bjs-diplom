let logoutButton = new LogoutButton();

logoutButton.action = () => ApiConnector.logout(
  (response) => {
    if (response.success){
      location.reload()
    }
});


ApiConnector.current((response) => {
  if (response.success){
    ProfileWidget.showProfile(response.data);
  } 
}); 


let ratesBoard = new RatesBoard();

ratesBoard.getStocksCallback = () => ApiConnector.getStocks(
  (response) => {
    if (response.success) {
      ratesBoard.clearTable();
      ratesBoard.fillTable(response.data);
    }
});

ratesBoard.getStocksCallback();

setInterval(() => ratesBoard.getStocksCallback(), 60000);


let moneyManager = new MoneyManager();

moneyManager.addMoneyCallback = (data) => ApiConnector.addMoney(data, 
  (response) => {
    if (response.success) {
      ProfileWidget.showProfile(response.data);
      moneyManager.setMessage(true, response.message);
    }
    
});

moneyManager.conversionMoneyCallback = (data) => ApiConnector.convertMoney(data,
  (response) => {
    if (response.success){
      ProfileWidget.showProfile(response.data);
    }
});

moneyManager.sendMoneyCallback = (data) => ApiConnector.transferMoney(data,
  (response) => {
    if (response.success){
      ProfileWidget.showProfile(response.data);
    }
});

let favoritesWidget = new FavoritesWidget();

ApiConnector.getFavorites((response) => {
  if (response.success) {
    favoritesWidget.clearTable();
    favoritesWidget.fillTable(response.data);
    moneyManager.updateUsersList(response.data)
  }
});

favoritesWidget.addUserCallback = (data) => ApiConnector.addUserToFavorites(data,
  (response) => {
    if (response.success) {
      favoritesWidget.clearTable();
      favoritesWidget.fillTable(response.data);
      moneyManager.updateUsersList(response.data)
    }
});

favoritesWidget.removeUserCallback = (data) => ApiConnector.removeUserFromFavorites(data,
  (response) => {
    if (response.success) {
      favoritesWidget.clearTable();
      favoritesWidget.fillTable(response.data);
      moneyManager.updateUsersList(response.data)
    }
});