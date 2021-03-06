import React, { useState } from 'react';
import PropTypes from 'prop-types';
import FundingItem from './FundingItem';

const Funding = ({
  groups,
  plan,
  onChange,
  systemGroupId,
}) => {
  const [funding, setFunding] = useState(plan);

  const handleDeltaChange = (amount, categoryId) => {
    const index = funding.findIndex((c) => c.categoryId === categoryId);
    let newFunding = [];

    if (index !== -1) {
      newFunding = [
        ...funding.slice(0, index),
        { ...funding[index], categoryId, amount },
        ...funding.slice(index + 1),
      ];
    }
    else {
      // Find the category in the group/category tree
      let category;
      const group = groups.find((g) => {
        category = g.categories.find((c) => c.id === categoryId);

        return category !== undefined;
      });

      newFunding = [
        ...funding.slice(),
        {
          categoryId,
          amount,
          category: category.name,
          group: group.name,
        },
      ];
    }

    setFunding(newFunding);

    if (onChange) {
      onChange(newFunding);
    }
  };

  const populateCategories = (categories) => (
    categories.map((category) => {
      let amount = 0;

      const index = funding.findIndex((c) => c.categoryId === category.id);

      if (index !== -1) {
        amount = funding[index].amount;
      }

      return (
        <FundingItem
          key={`${category.id}`}
          name={category.name}
          initialAmount={category.balance}
          funding={amount}
          onDeltaChange={(newAmount) => (
            handleDeltaChange(newAmount, category.id)
          )}
        />
      );
    })
  );

  const populateGroups = () => {
    const groupItems = [];

    groups.forEach((group) => {
      if (group.id !== systemGroupId) {
        groupItems.push((
          <div key={group.id}>
            {group.name}
            {populateCategories(group.categories)}
          </div>
        ));
      }
    });

    return groupItems;
  };

  return (
    <div className="cat-fund-items">
      {populateGroups()}
    </div>
  );
};

Funding.propTypes = {
  groups: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  plan: PropTypes.arrayOf(PropTypes.shape()),
  onChange: PropTypes.func,
  systemGroupId: PropTypes.number.isRequired,
};

Funding.defaultProps = {
  plan: [],
  onChange: null,
};

export default Funding;
