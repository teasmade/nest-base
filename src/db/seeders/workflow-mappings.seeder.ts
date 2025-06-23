import { DataSource } from 'typeorm';
import { Seeder } from 'typeorm-extension';
import { WorkflowMapping } from '../../workflows/entities/workflow-mapping.entity';

export default class WorkflowMappingsSeeder implements Seeder {
  async run(dataSource: DataSource): Promise<void> {
    console.info('Seeding Workflow Mappings...');

    const workflowMappingRepository = dataSource.getRepository(WorkflowMapping);

    const workflowMappings = [
      {
        name: 'REQUEST_VEHICLE_RENTAL',
        label: 'Demande de location de véhicule',
        description:
          'La suite des actions à effectuer pour une demande de location de véhicule',
      },
      {
        name: 'REQUEST_VEHICLE_REPAIR',
        label: 'Demande de réparation de véhicule',
        description:
          'La suite des actions à effectuer pour une demande de réparation de véhicule',
      },
      {
        name: 'DIAGNOSTIC_FLASH',
        label: 'Diagnostic flash',
        description:
          'La suite des actions à effectuer pour un diagnostic flash',
      },
      {
        name: 'CREATE_PARTNER',
        label: 'Création de partenaire',
        description:
          'La suite des actions à effectuer pour créer un partenaire',
      },
      {
        name: 'CREATE_INTERIMAIRE',
        label: "Création d'interimaire",
        description:
          'La suite des actions à effectuer pour créer un interimaire',
      },
      {
        name: 'CREATE_USER',
        label: "Création d'utilisateur",
        description:
          'La suite des actions à effectuer pour créer un utilisateur',
      },
    ];

    for (const workflowMapping of workflowMappings) {
      const newWorkflowMapping = workflowMappingRepository.create({
        name: workflowMapping.name,
        label: workflowMapping.label,
        description: workflowMapping.description,
      });
      await workflowMappingRepository.save(newWorkflowMapping);
    }
  }
}
