module.exports = {
  getlist: function () {
    return list
  }
}

var list = [
  {
    id: '1287',
    due: new Date('2016-12-23 23:59'),
    reservations: 1,
    property: '2488',
    bankcode: '011',
    bankname: '농협',
    account: '312-0042-6321-61',
    accontname: '최상우',
    price: 180000,
    status: '정산예정'
  },
  {
    id: '1286',
    due: new Date('2016-12-23 23:59'),
    reservations: 1,
    property: '3878',
    bankcode: '081',
    bankname: '하나',
    account: '110-463-672192',
    accontname: '김지호',
    price: 38000,
    status: '정산예정'
  },
  {
    id: '1285',
    due: new Date('2016-12-23 23:59'),
    reservations: 5,
    property: '3858',
    bankcode: '004',
    bankname: '국민',
    account: '137301-04-298845',
    accontname: '정수영',
    price: 442000,
    status: '정산예정'
  },
  {
    id: '1284',
    due: new Date('2016-12-23 23:59'),
    reservations: 3,
    property: '1349',
    bankcode: '088',
    bankname: '신한',
    account: '110-213-411695',
    accontname: '유덕현',
    price: 1899400,
    status: '정산예정'
  },
  {
    id: '1280',
    due: new Date('2016-12-16 23:59'),
    reservations: 2,
    property: '3934',
    bankcode: '032',
    bankname: '부산',
    account: '086-12-066137-5',
    accontname: '김형석',
    price: 920000,
    status: '입금완료'
  },
  {
    id: '1270',
    due: new Date('2016-12-8 23:59'),
    reservations: 6,
    property: '3936',
    bankcode: '088',
    bankname: '신한',
    account: '110-462-501719',
    accontname: '곽성용',
    price: 390000,
    status: '세금완료'
  },
  {
    id: '1279',
    due: new Date('2016-12-16 23:59'),
    reservations: 7,
    property: '3868',
    bankcode: '',
    bankname: '',
    account: '',
    accontname: '',
    price: 82000,
    status: '보류됨'
  },
]
