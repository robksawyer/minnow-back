'use strict';

/**
*
* Stripe Test Cards
* @url 
**/

var success_cards = [
  {
    number: '4242424242424242', 
    name: 'Visa'
  },
  {
    number: '4012888888881881', 
    name: 'Visa'
  },
  {
    number: '4000056655665556',
    name: 'Visa (debit)'
  },
  {
    number: '5555555555554444',
    name: 'MasterCard'
  },
  {
    number: '5200828282828210',
    name: 'MasterCard (debit)'
  },
  {
    number: '5105105105105100',
    name: 'MasterCard (prepaid)'
  },
  {
    number: '378282246310005',
    name: 'American Express'
  },
  {
    number: '371449635398431',
    name: 'American Express'
  },
  {
    number: '6011111111111117',
    name: 'Discover'
  },
  {
    number: '6011000990139424',
    name: 'Discover'
  },
  {
    number: '30569309025904',
    name: 'Diners Club'
  },
  {
    number: '38520000023237',
    name: 'Diners Club'
  },
  {
    number: '3530111333300000',
    name: 'JCB'
  },
  {
    number: '3566002020360505',
    name: 'JCB'
  }
];

var fail_cards = [
  {
    number: '4000000000000010', 
    message: 'With default account settings, charge will succeed but address_line1_check and address_zip_check will both fail.'
  },
  {
    number: '4000000000000028', 
    message: 'With default account settings, charge will succeed but address_line1_check will fail.'
  },
  {
    number: '4000000000000036',
    message: 'With default account settings, charge will succeed but address_zip_check will fail.'
  },
  {
    number: '4000000000000044',
    message: 'With default account settings, charge will succeed but address_zip_check and address_line1_check will both be unchecked.'
  },
  {
    number: '4000000000000101',
    message: 'With default account settings, charge will succeed but cvc_check will fail if a CVC is entered.'
  },
  {
    number: '4000000000000341',
    message: 'Attaching this card to a Customer object will succeed, but attempts to charge the customer will fail.'
  },
  {
    number: '4000000000000002',
    message: 'Charges with this card will always be declined with a card_declined code.'
  },
  {
    number: '4000000000000127',
    message: 'Charge will be declined with an incorrect_cvc code.'
  },
  {
    number: '4000000000000069',
    message: 'Charge will be declined with an expired_card code.'
  },
  {
    number: '4000000000000119',
    message: 'Charge will be declined with a processing_error code.'
  }
];

var recipient_debit = [
  {
    number: '4000056655665556',
    name: 'Visa debit card' 
  },
  {
    number: '5200828282828210',
    name: 'MasterCard debit card' 
  }
];

var bank_accounts = [
  {
    number: '000123456789',
    message: 'Transfer will succeed.' 
  },
  {
    number: '000111111116',
    message: 'Transfer will fail with a no_account code.' 
  },
  {
    number: '000111111113',
    message: 'Transfer will fail with an account_closed code.' 
  },
  {
    number: '000222222227',
    message: 'Transfer will fail with an insufficient_funds code.' 
  },
  {
    number: '000333333335',
    message: 'Transfer will fail with a not_authorized code.' 
  },
  {
    number: '000444444440',
    message: 'Transfer will fail with an invalid_currency code.' 
  }
];

module.exports = {

  getRecDebitCard: function(num){
    var theCard;
    if(!num){
      var randNum = Math.floor(Math.random() * recipient_debit.length);
      theCard = recipient_debit[randNum].number;
    } else {
      theCard = recipient_debit[num].number;
    }
    return theCard;
  },

  getSuccessCard: function(num){
    var theCard;
    if(!num){
      var randNum = Math.floor(Math.random() * success_cards.length);
      theCard = success_cards[randNum].number;
    } else {
      theCard = success_cards[num].number;
    }
    return theCard;
  },

  getFailCard: function(num){
    var theCard;
    if(!num){
      var randNum = Math.floor(Math.random() * fail_cards.length);
      theCard = fail_cards[randNum].number;
    } else {
      theCard = fail_cards[num].number;
    }
    return theCard;
  },

  getBankAccount: function(num){
    var theCard;
    if(!num){
      var randNum = Math.floor(Math.random() * bank_accounts.length);
      theCard = bank_accounts[randNum].number;
    } else {
      theCard = bank_accounts[num].number;
    }
    return theCard;
  }

};