import React from 'react';


if (!__SSR__) {
  require('./styles.scss');
}


const Breadcrumb = (props) => {
  const { categories } = props;

  return (
    <div className="breadcrumb row">
      <div className="col-12">
        {
          categories ?
            categories
            .slice(0, categories.length - 1)
            .map((category) =>
              (<span key={category}>
                <span className="category">
                  {category}
                </span>
                <span className="arrow">
                  {'>'}
                </span>
               </span>))
            :
              ''
        }
        {
          categories ?
            <span className="current-category">
              {categories.slice(-1)[0]}
            </span>
            :
              ''
        }
      </div>
    </div>
  );
};

export default Breadcrumb;
