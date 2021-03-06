import { makeAutoObservable, runInAction } from 'mobx';
import FundingPlanGroup from './FundingPlanGroup';
import { StoreInterface } from './State';
import { getBody, putJSON } from './Transports';
import { FundingPlanDetailsProps, isUpdateCategoryResponse, isUpdateFundingCategoryResponse } from '../../common/ResponseTypes';

class FundingPlanDetails {
  planId: number;

  history: Array<unknown>

  total: number;

  groups: Array<FundingPlanGroup>;

  store: StoreInterface;

  constructor(store: StoreInterface, props: FundingPlanDetailsProps) {
    this.planId = props.id;
    this.history = props.history;
    this.total = props.total;

    this.groups = props.groups.map((g) => (
      new FundingPlanGroup(store, g)
    ));

    makeAutoObservable(this);

    this.store = store;
  }

  async updateCategoryAmount(categoryId: number, amount: number, delta: number): Promise<void> {
    const response = await putJSON(`/funding_plan/${this.planId}/item/${categoryId}`, { amount });

    const body = await getBody(response);

    if (response.ok && isUpdateFundingCategoryResponse(body)) {
      runInAction(() => {
        this.groups.some((g) => {
          const cat = g.categories.find((c) => c.id === categoryId);

          if (cat) {
            cat.amount = body.amount;

            return true;
          }

          return false;
        });

        this.total += delta;
      });
    }
    else {
      throw new Error('invalid response');
    }
  }
}

export default FundingPlanDetails;
