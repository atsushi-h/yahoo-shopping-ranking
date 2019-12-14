// src/components/Ranking.js
import React from 'react';
import PropTypes from 'prop-types';


export default class Ranking extends React.Component {
  componentWillMount() {
    this.props.onMount(this.props.cateforyId);
  }
  componentWillReceiveProps(nextProps) {
    // props.cateforyIdに変化がある→ページ遷移がある
    if(this.props.cateforyId !== nextProps.cateforyId) {
      this.props.onUpdate(nextProps.cateforyId);
    }
  }

  render() {
    const { category, ranking, error } = this.props;

    return (
      <div>
        <h2>{
          typeof category !== 'undefined'
            ? `${category.name}のランキング`
            : ''
        }</h2>
        
        {(() => {
          if (error) {
            // エラー表示
            return <p>エラーが発生しました。リロードしてください。</p>;
          } else if (typeof ranking === 'undefined') {
            // リクエスト完了前
            return <p>読み込み中...</p>;
          } else {
            // ランキングの表示（3の機能）
            return (
              <ol>
                {ranking.map(item => (
                  <li key={`ranking-item-${item.code}`}>
                    <img alt={item.name} src={item.imageUrl} />
                    <a href={item.url} target="_blank">{item.name}</a>
                  </li>
                ))}
              </ol>
            );
          }
        })()}
      </div>
    )
  }
}

Ranking.propTypes = {
  categoryId: PropTypes.string.isRequired,
  onMount: PropTypes.func.isRequired,
  onUpdate: PropTypes.func.isRequired,

  category: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  }),
  ranking: PropTypes.arrayOf(
    PropTypes.shape({
      code: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired,
      imageUrl: PropTypes.string.isRequired,
    })
  ),
  error: PropTypes.bool.isRequired
};
Ranking.defaultProps = {
    categoryId: '1'
};
