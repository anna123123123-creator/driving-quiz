(function () {
  'use strict';

  var QUESTIONS = [
    { q: '在没有交通信号灯、交通标志、交通标线控制也没有交通警察指挥的交叉路口，转弯的机动车让直行的车辆和行人优先通行，这种说法：', options: ['正确', '错误，应直行让转弯', '仅白天适用', '仅左转适用'], answer: 0, explain: '无信号灯路口，转弯让直行是基本让行规则之一。' },
    { q: '机动车在高速公路上行驶，能见度小于 50 米时，最高时速不得超过多少，并从最近出口驶离？', options: ['20 公里/小时', '40 公里/小时', '60 公里/小时', '80 公里/小时'], answer: 0, explain: '能见度低于50米属于严重恶劣天气，限速不超过20km/h，并尽快驶离高速。' },
    { q: '红色圆形信号灯亮时表示：', options: ['允许所有车辆通行', '禁止车辆通行', '只允许右转', '减速慢行后通行'], answer: 1, explain: '红灯是最基本的禁止通行信号。' },
    { q: '黄色闪烁信号灯表示：', options: ['禁止通行', '车辆、行人须在确保安全的原则下通行', '只允许直行', '等同红灯'], answer: 1, explain: '黄闪是提示注意、确保安全后通行，不是禁止信号。' },
    { q: '驾驶机动车在道路上发生故障难以移动，需要停车排除故障时，以下做法正确的是：', options: ['占用应急车道等待', '开启危险报警闪光灯，车后设置警告标志', '把车留在原地，人员留车内等待', '不需要采取任何措施'], answer: 1, explain: '故障停车须开启双闪并按规定距离设置警告标志（一般车辆150米外，高速公路150米外）。' },
    { q: '在高速公路上遇车辆故障停车，车上人员应当：', options: ['留在车内系好安全带', '迅速转移到右侧路肩以外或护栏外并报警', '站在车后方指挥来车', '在车前放置警告标志后原地等待'], answer: 1, explain: '高速公路事故/故障停车最重要的是人员迅速撤离到护栏外，避免二次事故。' },
    { q: '驾驶机动车通过没有交通信号灯、交通标志、交通标线控制也没有交通警察指挥的交叉路口，让行顺序正确的是：', options: ['右方道路来车先行', '左方道路来车先行', '速度快的先行', '车型大的先行'], answer: 0, explain: '无信号控制交叉路口，基本原则是右方道路来车优先。' },
    { q: '驾驶机动车在没有中心线的道路上会车，遇对面来车有障碍时：', options: ['无障碍的一方先行', '有障碍的一方先行', '谁先鸣笛谁先行', '双方同时通过'], answer: 0, explain: '无障碍方具备更好的通行条件，应先行，有障碍方让行。' },
    { q: '机动车行驶超过规定时速 50% 的，一次记多少分？', options: ['3 分', '6 分', '12 分', '不记分'], answer: 2, explain: '超速50%以上属于严重违法行为，一次记12分。' },
    { q: '饮酒后驾驶机动车，血液酒精含量达到多少属于醉酒驾驶？', options: ['20mg/100ml 以上', '80mg/100ml 以上', '100mg/100ml 以上', '150mg/100ml 以上'], answer: 1, explain: '国家标准：血液酒精含量≥80mg/100ml 即认定为醉驾。' },
    { q: '将机动车借给未取得相应驾驶证的人驾驶，属于：', options: ['违法行为，会被处罚', '不属于违法，个人自由', '只有营运车辆才违法', '只在高速公路上违法'], answer: 0, explain: '出借车辆给无证人员驾驶属于违法行为，车主同样要承担责任。' },
    { q: '机动车行驶中遇前方车辆排队或行驶缓慢时，正确做法是：', options: ['借用应急车道通行', '鸣喇叭催促', '依次排队等候或交替通行', '强行加塞超车'], answer: 2, explain: '拥堵路段应依次排队，路口无灯控时可交替通行，禁止占用应急车道。' },
    { q: '驾驶机动车通过人行横道时，应当：', options: ['鸣喇叭示意行人让行', '加速通过', '减速或者停车让行人通过', '正常速度通过'], answer: 2, explain: '斑马线前机动车须减速甚至停车礼让行人，这是强制性规则。' },
    { q: '机动车行驶中遇儿童在道路上通过，正确做法是：', options: ['正常速度通过', '鸣喇叭催促', '减速或停车让行', '加速通过以缩短占道时间'], answer: 2, explain: '儿童反应和判断能力弱，遇到应主动减速或停车让行。' },
    { q: '公路上机动车通过没有信号灯控制、无人看守的铁路道口时，最高速度不得超过：', options: ['15 公里/小时', '30 公里/小时', '35 公里/小时', '40 公里/小时'], answer: 0, explain: '无人看守铁路道口风险高，限速不超过15km/h，并需确认安全后通过。' },
  ];

  var qNum = document.getElementById('qNum');
  var qText = document.getElementById('qText');
  var optionsWrap = document.getElementById('optionsWrap');
  var explainText = document.getElementById('explainText');
  var btnNext = document.getElementById('btnNext');
  var btnRestart = document.getElementById('btnRestart');
  var scoreText = document.getElementById('scoreText');

  var order = [];
  var current = 0;
  var correctCount = 0;
  var attempted = 0;
  var answered = false;

  function shuffle(arr) {
    var a = arr.slice();
    for (var i = a.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var tmp = a[i]; a[i] = a[j]; a[j] = tmp;
    }
    return a;
  }

  function updateScore() {
    scoreText.textContent = correctCount + ' / ' + attempted;
  }

  function loadQuestion() {
    answered = false;
    btnNext.disabled = true;
    explainText.textContent = '';
    var idx = order[current];
    var item = QUESTIONS[idx];
    qNum.textContent = '第 ' + (current + 1) + ' / ' + order.length + ' 题';
    qText.textContent = item.q;

    optionsWrap.innerHTML = '';
    var letters = ['A', 'B', 'C', 'D'];
    item.options.forEach(function (opt, i) {
      var btn = document.createElement('button');
      btn.className = 'option-btn';
      btn.innerHTML = '<span class="letter">' + letters[i] + '</span><span>' + opt + '</span>';
      btn.addEventListener('click', function () { selectAnswer(i, item); });
      optionsWrap.appendChild(btn);
    });
  }

  function selectAnswer(i, item) {
    if (answered) return;
    answered = true;
    attempted++;
    var isCorrect = i === item.answer;
    if (isCorrect) correctCount++;

    var btns = optionsWrap.querySelectorAll('.option-btn');
    btns.forEach(function (btn, idx) {
      btn.disabled = true;
      if (idx === item.answer) btn.classList.add('correct');
      else if (idx === i) btn.classList.add('wrong');
    });

    explainText.textContent = (isCorrect ? '✓ 回答正确。' : '✗ 回答错误。') + item.explain;
    btnNext.disabled = false;
    updateScore();
  }

  function next() {
    current++;
    if (current >= order.length) {
      order = shuffle(order);
      current = 0;
    }
    loadQuestion();
  }

  function restart() {
    order = shuffle(QUESTIONS.map(function (_, i) { return i; }));
    current = 0;
    correctCount = 0;
    attempted = 0;
    updateScore();
    loadQuestion();
  }

  btnNext.addEventListener('click', next);
  btnRestart.addEventListener('click', restart);

  restart();
})();
