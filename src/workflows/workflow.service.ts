import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Workflow } from './entities/workflow.entity';
import { User } from '../users/entities/user.entity';

@Injectable()
export class WorkflowService {
  constructor(
    @InjectRepository(Workflow)
    private workflowRepository: Repository<Workflow>,
  ) {}

  async findAll(): Promise<Partial<Workflow>[]> {
    return this.workflowRepository.find({
      relations: [
        'versions',
        'versions.createdBy',
        'activeVersion',
        'createdBy',
        'updatedBy',
      ],
      select: {
        id: true,
        name: true,
        description: true,
        isPublished: true,
        createdAt: true,
        updatedAt: true,
        activeVersion: {
          id: true,
        },
        createdBy: {
          // id: true,
          email: true,
        },
        updatedBy: {
          // id: true,
          email: true,
        },
        versions: {
          id: true,
          version: true,
          description: true,
          isPublished: true,
          // createdAt: true,
          createdBy: {
            // id: true,
            email: true,
          },
        },
      },
    });
  }

  async findOne(id: string): Promise<Workflow | null> {
    const workflow = await this.workflowRepository.findOne({
      where: { id },
      relations: ['versions', 'activeVersion', 'createdBy', 'updatedBy'],
    });

    if (!workflow) {
      throw new NotFoundException(`Workflow with ID ${id} not found`);
    }

    return workflow;
  }

  async create(workflowData: Partial<Workflow>, user: User): Promise<Workflow> {
    const workflow = this.workflowRepository.create({
      ...workflowData,
      createdBy: user,
      updatedBy: user,
    });
    return this.workflowRepository.save(workflow);
  }

  async update(
    id: string,
    workflowData: Partial<Workflow>,
    user: User,
  ): Promise<Workflow> {
    const workflow = await this.findOne(id);

    if (!workflow) {
      throw new NotFoundException(`Workflow with ID ${id} not found`);
    }

    Object.assign(workflow, {
      ...workflowData,
      updatedBy: user,
    });
    return this.workflowRepository.save(workflow);
  }

  async remove(id: string): Promise<void> {
    const workflow = await this.findOne(id);

    if (!workflow) {
      throw new NotFoundException(`Workflow with ID ${id} not found`);
    }

    await this.workflowRepository.remove(workflow);
  }

  async publish(id: string, user: User): Promise<Workflow> {
    const workflow = await this.findOne(id);

    if (!workflow) {
      throw new NotFoundException(`Workflow with ID ${id} not found`);
    }

    workflow.isPublished = true;
    workflow.updatedBy = user;
    return this.workflowRepository.save(workflow);
  }
}
