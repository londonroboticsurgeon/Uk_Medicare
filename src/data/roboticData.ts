export interface RoboticFeature {
  title: string;
  description: string;
  benefit: string;
}

export interface ProcedureComparison {
  feature: string;
  open: string;
  laparoscopic: string;
  robotic: string;
}

export const roboticOverview = {
  headline: 'Robotic-assisted surgery in London',
  subheadline: 'General information about surgeon-controlled minimally invasive surgery',
  nationalRecordBadge: 'Robotic surgery programme at Ealing Hospital',
  nationalRecordDescription:
    'This video introduces the robotic surgery programme at Ealing Hospital. It does not determine whether robotic surgery is suitable for an individual patient.',
  videoUrl: 'https://www.youtube.com/watch?v=Q__rvX_EEGQ',
  videoEmbedId: 'Q__rvX_EEGQ',
  features: [
    {
      title: 'Magnified three-dimensional view',
      description:
        'The surgeon views the operative field through a console during the procedure.',
      benefit: 'The visual system can assist the surgeon during selected operations.',
    },
    {
      title: 'Wristed instruments',
      description:
        'The instruments translate the surgeon’s hand movements inside the body.',
      benefit: 'The approach may be useful where access and instrument movement are important.',
    },
    {
      title: 'Surgeon-controlled system',
      description:
        'The robotic system does not operate independently; the surgeon controls each movement.',
      benefit: 'The surgical team remains responsible for the operation throughout.',
    },
  ] satisfies RoboticFeature[],
  comparisons: [
    {
      feature: 'Access',
      open: 'Usually uses a larger incision to reach the operative area.',
      laparoscopic: 'Usually uses several small ports for a camera and instruments.',
      robotic: 'Usually uses several small ports for a camera and robotic instruments.',
    },
    {
      feature: 'View',
      open: 'The surgeon views the operative area directly.',
      laparoscopic: 'A camera displays the operative field on a monitor.',
      robotic: 'A console provides a magnified three-dimensional camera view.',
    },
    {
      feature: 'Instruments',
      open: 'The surgeon works directly with conventional surgical instruments.',
      laparoscopic: 'The surgeon controls long instruments through the ports.',
      robotic: 'The surgeon controls wristed instruments from the console.',
    },
    {
      feature: 'Who performs the operation',
      open: 'The surgeon and theatre team perform the operation.',
      laparoscopic: 'The surgeon and theatre team perform the operation.',
      robotic: 'The surgeon controls the system and performs the operation with the theatre team.',
    },
    {
      feature: 'Suitability',
      open: 'Depends on the condition, anatomy, previous surgery and clinical assessment.',
      laparoscopic: 'Depends on the condition, anatomy, previous surgery and clinical assessment.',
      robotic: 'Depends on the condition, anatomy, previous surgery, hospital pathway and clinical assessment.',
    },
  ] satisfies ProcedureComparison[],
  roboticProcedures: [
    {
      name: 'Robotic hernia surgery',
      indication: 'May be considered for selected groin or abdominal wall hernias.',
      advantage: 'The most appropriate approach is decided after individual clinical assessment.',
    },
    {
      name: 'Robotic anti-reflux and hiatus hernia surgery',
      indication: 'May be considered for selected reflux or hiatus hernia procedures.',
      advantage: 'The most appropriate approach is decided after individual clinical assessment.',
    },
    {
      name: 'Robotic gallbladder surgery',
      indication: 'May be considered for selected gallbladder procedures.',
      advantage: 'The most appropriate approach is decided after individual clinical assessment.',
    },
  ],
};
