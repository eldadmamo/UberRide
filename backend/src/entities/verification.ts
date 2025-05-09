
import { verificationTarget } from "src/types/types";
import { BaseEntity, BeforeInsert, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn} from "typeorm";

const PHONE = "PHONE";
const EMAIL = "EMAIL"

@Entity()
class Verification extends BaseEntity{
    @PrimaryGeneratedColumn() id: number;

    @Column({type: "text", enum: [PHONE, EMAIL]})
    target: verificationTarget;

    @Column({type: "text", nullable: false})
    payload!: string;

    @Column({type: "text",nullable: false})
    key!: string;    

    @Column({type: "boolean",default: false})
    verified: boolean;   


    @CreateDateColumn() createdAt: string;
    @UpdateDateColumn() updatedAt: string; 

    @BeforeInsert()
    createKey(): void {
        if(this.target === PHONE){
            this.key = Math.floor(Math.random() * 100000).toString();
        } else if(this.target === EMAIL) {
            this.key = Math.random()
            .toString(36)
             .substr(2);
        }
    }
        
    
}

export default Verification;