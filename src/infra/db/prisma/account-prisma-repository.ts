import { AddAccountRepository, CheckAccountByEmailRepository, LoadAccountByEmailRepository, LoadAccountByTokenRepository, UpdateAccessTokenRepository } from '../../../data/protocols'
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export class AccountPrismaRepository implements AddAccountRepository, LoadAccountByEmailRepository, UpdateAccessTokenRepository, LoadAccountByTokenRepository, CheckAccountByEmailRepository {
    async add (data: AddAccountRepository.Params): Promise<AddAccountRepository.Result> {
      const account = await prisma.user.create({
        data
      })
      return account !== null
    }
  
    async loadByEmail (email: string): Promise<LoadAccountByEmailRepository.Result> {
    	const account = await prisma.user.findUnique({
    		where:{email}
      })
			return account;
    }
  
    async checkByEmail (email: string): Promise<CheckAccountByEmailRepository.Result> {
      const account = await prisma.user.findUnique({
    		where:{email}
      })
			return account !== null
    }
  
    async updateAccessToken (id: string, token: string): Promise<void> {
      await prisma.user.update({
				data:{
					accessToken: token
				},
				where: {id}
			})
    }
  
    async loadByToken (token: string, role?: string): Promise<LoadAccountByTokenRepository.Result> {
      const account = await prisma.user.findUnique({
				where: {accessToken:token}
			})
      return account;
    }
  }