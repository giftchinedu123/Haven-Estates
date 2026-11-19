import { HOME_STATS } from '../utils/constants';

export function StatsRow() {
  return (
    <div className="stats-row">
      {HOME_STATS.map((stat) => (
        <div key={stat.label} className="stats-row__item">
          <p className="stats-row__value">{stat.value}</p>
          <p className="stats-row__label">{stat.label}</p>
        </div>
      ))}
    </div>
  );
}
