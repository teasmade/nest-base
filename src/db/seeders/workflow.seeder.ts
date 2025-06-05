import { Workflow } from '../../workflows/entities/workflow.entity';
import { WorkflowVersion } from '../../workflows/entities/workflow-version.entity';
import { DataSource } from 'typeorm';
import { Seeder } from 'typeorm-extension';
import { User } from '../../users/entities/user.entity';

export default class WorkflowSeeder implements Seeder {
  track = true;

  async run(dataSource: DataSource): Promise<void> {
    console.info('Seeding Workflows...');

    const workflowRepository = dataSource.getRepository(Workflow);
    const versionRepository = dataSource.getRepository(WorkflowVersion);
    const userRepository = dataSource.getRepository(User);

    // Get the first user to use as creator/updater
    const user = await userRepository.findOne({ where: {} });
    if (!user) {
      throw new Error('No users found. Please run UserSeeder first.');
    }

    // Create test workflows
    const workflows = [
      {
        name: 'Order Processing',
        description: 'Handles order processing workflow',
        isPublished: true,
      },
      {
        name: 'Customer Onboarding',
        description: 'New customer registration process',
        isPublished: false,
      },
    ];

    for (const workflowData of workflows) {
      const workflow = workflowRepository.create({
        ...workflowData,
        createdBy: user,
        updatedBy: user,
      });
      await workflowRepository.save(workflow);

      // Create versions for each workflow
      const versions = [
        {
          version: '1.0.0',
          description: 'Initial version',
          definition: {
            nodes: [
              { id: 'start', type: 'start', position: { x: 0, y: 0 } },
              { id: 'end', type: 'end', position: { x: 100, y: 100 } },
            ],
            edges: [{ id: 'edge1', source: 'start', target: 'end' }],
          },
          isPublished: true,
        },
        {
          version: '1.1.0',
          description: 'Updated version',
          definition: {
            nodes: [
              { id: 'start', type: 'start', position: { x: 0, y: 0 } },
              { id: 'process', type: 'process', position: { x: 50, y: 50 } },
              { id: 'end', type: 'end', position: { x: 100, y: 100 } },
            ],
            edges: [
              { id: 'edge1', source: 'start', target: 'process' },
              { id: 'edge2', source: 'process', target: 'end' },
            ],
          },
          isPublished: false,
        },
      ];

      for (const versionData of versions) {
        const version = versionRepository.create({
          ...versionData,
          workflow,
          createdBy: user,
          updatedBy: user,
        });
        await versionRepository.save(version);

        // Set the first version as active if the workflow is published
        if (workflow.isPublished && versionData.version === '1.0.0') {
          workflow.activeVersion = version;
          await workflowRepository.save(workflow);
        }
      }
    }

    console.info('Workflow seeding completed');
  }
}
