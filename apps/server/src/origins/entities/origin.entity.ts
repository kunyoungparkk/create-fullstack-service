import { Column, CreateDateColumn, Entity, PrimaryColumn, UpdateDateColumn } from 'typeorm';
import { uuidv7 } from 'uuidv7';

@Entity()
export class Origin {
  @PrimaryColumn('uuid')
  id: string = uuidv7();

  @Column({ unique: true })
  url!: string;

  @Column({ default: true })
  isActive = true;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
