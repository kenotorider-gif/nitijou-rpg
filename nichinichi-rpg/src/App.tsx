import { useState } from "react";

const initialLog = ["🌟 塊根類戦士じゃがいも、出陣！ 敵：消しゴムが現れた！"];

export default function RPGBattle() {
  const [log, setLog] = useState(initialLog);
  const [playerHP, setPlayerHP] = useState(1327);
  const [enemyHP, setEnemyHP] = useState(900);
  const [mp, setMP] = useState(478);
  const [isPlayerTurn, setIsPlayerTurn] = useState(true);

  const attack = () => {
    if (!isPlayerTurn) return;
    const damage = Math.floor((212 * 1.0) / 80 * 100);
    setEnemyHP((prev) => Math.max(prev - damage, 0));
    setLog((prev) => [`🥔 通常攻撃！ 消しゴムに ${damage} ダメージ！`, ...prev]);
    endTurn();
  };

  const skill1 = () => {
    if (!isPlayerTurn || mp < 53) return;
    const damage = Math.floor((212 * 1.2) / 80 * 100);
    setEnemyHP((prev) => Math.max(prev - damage, 0));
    setMP((prev) => prev - 53);
    setLog((prev) => [`🧄 マッシュスマッシュ発動！ ${damage} ダメージを与えた！`, ...prev]);
    endTurn();
  };

  const defend = () => {
    if (!isPlayerTurn) return;
    setLog((prev) => ["🥔 じゃがいもは防御を固めた！", ...prev]);
    endTurn();
  };

  const item = () => {
    if (!isPlayerTurn) return;
    setPlayerHP((prev) => Math.min(prev + 300, 1327));
    setLog((prev) => ["🧪 回復薬使用！ HP300回復！", ...prev]);
    endTurn();
  };

  const endTurn = () => {
    setIsPlayerTurn(false);
    setTimeout(() => {
      if (enemyHP <= 0) {
        setLog((prev) => ["🎉 消しゴムを倒した！勝利！", ...prev]);
        return;
      }
      const damage = Math.floor((150 * 1.0) / 100 * 100);
      setPlayerHP((prev) => Math.max(prev - damage, 0));
      setLog((prev) => [`✏️ 消しゴムの反撃！ ${damage} ダメージ！`, ...prev]);
      setIsPlayerTurn(true);
    }, 1000);
  };

  return (
    <div className="p-4 max-w-xl mx-auto space-y-4">
      <div className="bg-white rounded shadow p-4">
        <p>🥔 HP: {playerHP} / 1327｜MP: {mp} / 478</p>
        <p>✏️ HP（敵）: {enemyHP} / 900</p>
      </div>
      <div className="grid grid-cols-2 gap-2">
        <button className="bg-blue-500 text-white p-2 rounded" onClick={attack} disabled={!isPlayerTurn}>Attack</button>
        <button className="bg-green-500 text-white p-2 rounded" onClick={skill1} disabled={!isPlayerTurn}>Skill 1</button>
        <button className="bg-yellow-500 text-white p-2 rounded" onClick={defend} disabled={!isPlayerTurn}>Defend</button>
        <button className="bg-purple-500 text-white p-2 rounded" onClick={item} disabled={!isPlayerTurn}>Item</button>
      </div>
      <div className="bg-gray-200 rounded p-2 h-64 overflow-y-scroll text-sm whitespace-pre-line">
        {log.map((entry, i) => <div key={i}>{entry}</div>)}
      </div>
    </div>
  );
}
