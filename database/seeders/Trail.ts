import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Trail from 'App/Models/Trail'

export default class TrailSeeder extends BaseSeeder {
  public async run() {
    await Trail.create(
      {
        name: 'Desenvolvimento Full Stack',
        description: 'O desenvolvedor full stack é o profissional habilitado para compreender e operar em todas as camadas do desenvolvimento de um projeto, desde a criação de servidores internos (Backend) até interfaces de comunicação com o usuário final (Frontend).',
        estimatedTime: 50
      }
    )

    await Trail.create(
      {
        name: 'QA (Quality Assurance)',
        description: 'O Quality Assurance é o conjunto de atividades que tentam garantir que o produto ou serviço oferecidos esteja de acordo com o nível de qualidade exigido. O trabalho do profissional de QA envolve um processo sistemático de realização de testes focado no processo de desenvolvimento. Isso é necessário para garantir que o produto final não chegue às mãos do cliente com erros ou problemas de mau funcionamento.',
        estimatedTime: 180
      }
    )

    await Trail.create(
      {
        name: 'UI/UX Design',
        description: 'Enquanto o foco do UI design é a criação de uma interface amigável, o UX é voltado para a maneira como o usuário vive o uso de um produto. O UI trata dos elementos com os quais o usuário interage, ao passo que o UX procura entender os comportamentos e emoções dessas pessoas no uso do produto.',
        estimatedTime: 30
      }
    )
  }
}
