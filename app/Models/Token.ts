import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm';

class Token extends BaseModel {
  @column()
  public id: number;

  @column()
  public userId: number;

  @column()
  public token: string;

  @column()
  public type: string;

  @column()
  public isRevoked: boolean;
}

export default Token;
