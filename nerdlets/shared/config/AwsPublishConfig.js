export default {
  title: 'Publish Workflow',
  eventTypes: [
    {
      event: 'DatastoreSample',
      attributes: [
        ['awsAccountId', 'AWS'],
        ['awsRegion', 'AWS'],
        ['label.Name', 'Tags'],
        ['label.Workflow', 'Tags'],
      ],
    },
  ],
  metrics: [
    {
      title: 'Publishes Initiated (Count)',
      threshold: {
        critical: 3,
        warning: 5,
        type: 'below',
      },
      invertCompareTo: 'true',
      query: {
        nrql: `SELECT sum(provider.executionsStarted.Sum) as 'result' FROM AwsStatesStateMachineSample WHERE \`label.aws:cloudformation:logical-id\` = 'PublishWorkflow'`,
        lookup: 'result',
      },
      detailDashboardId: 'Pub-Init-Detail',
    },
    {
      title: 'Publishes Succeeded (Count)',
      threshold: {
        critical: 3,
        warning: 5,
        type: 'below',
      },
      invertCompareTo: 'true',
      query: {
        nrql: `SELECT sum(provider.executionsSucceeded.Sum) as 'result' FROM AwsStatesStateMachineSample WHERE \`label.aws:cloudformation:logical-id\` = 'PublishWorkflow'`,
        lookup: 'result',
      },
      detailDashboardId: 'Pub-Success-Detail',
    },
    {
      title: 'Publishes Failed (Count)',
      threshold: {
        critical: 1,
        warning: .5,
      },
      query: {
        nrql: `SELECT sum(provider.executionsFailed.Sum) as 'result' FROM AwsStatesStateMachineSample WHERE \`label.aws:cloudformation:logical-id\` = 'PublishWorkflow'`,
        lookup: 'result',
      },
      detailDashboardId: 'Pub-Fail-Detail',
    },
    {
      title: 'Publish Time (s)',
      threshold: {
        critical: 20,
        warning: 10,
      },
      query: {
        nrql: `SELECT average(provider.executionTime.Average/1000) as 'result' FROM AwsStatesStateMachineSample WHERE \`label.aws:cloudformation:logical-id\` ='PublishWorkflow'`,
        lookup: 'result',
      },
      detailDashboardId: 'Pub-Time-Detail',
    },
    {
      title: 'Publish Failure Ratio (%)',
      threshold: {
        critical: 10,
        warning: 5,
      },
      query: {
        nrql: `FROM AwsStatesStateMachineSample SELECT sum(provider.executionsFailed.Sum) / sum(provider.executionsStarted.Sum) * 100 as 'result' WHERE \`label.aws:cloudformation:logical-id\` = 'PublishWorkflow'`,
        lookup: 'result',
      },
      detailDashboardId: 'Pub-Fail-Ratio-Detail',
    },
  ],
  overviewDashboard: [
    {
      nrql: `SELECT sum(provider.executionsStarted.Sum) as 'Starts' FROM AwsStatesStateMachineSample WHERE \`label.aws:cloudformation:logical-id\` = 'PublishWorkflow'`,
      columnStart: 1,
      columnEnd: 3,
      chartSize: 'small',
      chartType: 'billboard',
      title: 'Publishes Initiated',
      useSince: true,
    },
    {
      nrql: `SELECT sum(provider.executionsStarted.Sum) as 'Starts' FROM AwsStatesStateMachineSample WHERE \`label.aws:cloudformation:logical-id\` = 'PublishWorkflow'`,
      columnStart: 4,
      columnEnd: 12,
      chartSize: 'small',
      chartType: 'line',
      title: 'Publishes Initiated',
      useSince: true,
    },
    {
      nrql: `SELECT sum(provider.executionsSucceeded.Sum) as 'Succeeded' FROM AwsStatesStateMachineSample WHERE \`label.aws:cloudformation:logical-id\` = 'PublishWorkflow'`,
      columnStart: 1,
      columnEnd: 3,
      chartSize: 'small',
      chartType: 'billboard',
      title: 'Publishes Succeeded',
      useSince: true,
    },
    {
      nrql: `SELECT sum(provider.executionsStarted.Sum) as 'Succeeded' FROM AwsStatesStateMachineSample WHERE \`label.aws:cloudformation:logical-id\` = 'PublishWorkflow'`,
      columnStart: 4,
      columnEnd: 12,
      chartSize: 'small',
      chartType: 'line',
      title: 'Publishes Succeeded',
      useSince: true,
    },
    {
      nrql: `SELECT sum(provider.executionsFailed.Sum) as 'result' FROM AwsStatesStateMachineSample WHERE \`label.aws:cloudformation:logical-id\` = 'PublishWorkflow'`,
      columnStart: 1,
      columnEnd: 3,
      chartSize: 'small',
      chartType: 'billboard',
      title: 'Publishes Failed',
      useSince: true,
    },
    {
      nrql: `SELECT sum(provider.executionsFailed.Sum) as 'result' FROM AwsStatesStateMachineSample WHERE \`label.aws:cloudformation:logical-id\` = 'PublishWorkflow'`,
      columnStart: 4,
      columnEnd: 12,
      chartSize: 'small',
      chartType: 'line',
      title: 'Publishes Failed',
      useSince: true,
    },
    {
      nrql: `SELECT average(provider.executionTime.Average/1000) as 'Publish Time (s)' FROM AwsStatesStateMachineSample WHERE \`label.aws:cloudformation:logical-id\` ='PublishWorkflow'`,
      columnStart: 1,
      columnEnd: 3,
      chartSize: 'small',
      chartType: 'billboard',
      title: 'Publish Time (s)',
      useSince: true,
    },
    {
      nrql: `SELECT average(provider.executionTime.Average/1000) as 'Publish Time (s)' FROM AwsStatesStateMachineSample WHERE \`label.aws:cloudformation:logical-id\` ='PublishWorkflow'`,
      columnStart: 4,
      columnEnd: 12,
      chartSize: 'small',
      chartType: 'line',
      title: 'Publishes Time (s)',
      useSince: true,
    },
    {
      nrql: `FROM AwsStatesStateMachineSample SELECT sum(provider.executionsFailed.Sum) / sum(provider.executionsStarted.Sum) * 100 as 'Publish Failure Ratio' WHERE \`label.aws:cloudformation:logical-id\` = 'PublishWorkflow'`,
      columnStart: 1,
      columnEnd: 3,
      chartSize: 'small',
      chartType: 'billboard',
      title: 'Publish Failure Ratio (%)',
      useSince: true,
    },
    {
      nrql: `FROM AwsStatesStateMachineSample SELECT sum(provider.executionsFailed.Sum) / sum(provider.executionsStarted.Sum) * 100 as 'Publish Failure Ratio' WHERE \`label.aws:cloudformation:logical-id\` = 'PublishWorkflow'`,
      columnStart: 4,
      columnEnd: 12,
      chartSize: 'small',
      chartType: 'line',
      title: 'Publish Failure Ratio (%)',
      useSince: true,
    },
  ],
  detailDashboards: [
    {
      id: 'Pub-Init-Detail',
      config: [
        {
          nrql: `SELECT sum(provider.executionsStarted.Sum) as 'Executions' FROM AwsStatesStateMachineSample WHERE \`label.aws:cloudformation:logical-id\` = 'PublishWorkflow'`,
          columnStart: 1,
          columnEnd: 3,
          chartSize: 'medium',
          chartType: 'billboard',
          title: 'Publishes Initiated',
          useSince: true,
        },
        {
          nrql: `SELECT sum(provider.executionsStarted.Sum) as 'Executions' FROM AwsStatesStateMachineSample WHERE \`label.aws:cloudformation:logical-id\` = 'PublishWorkflow'`,
          columnStart: 4,
          columnEnd: 12,
          chartSize: 'medium',
          chartType: 'line',
          title: 'Publishes Initiated',
          useSince: true,
        }
      ],
    },
    {
      id: 'Pub-Success-Detail',
      config: [
        {
          nrql: `SELECT sum(provider.executionsSucceeded.Sum) as 'Succeeded' FROM AwsStatesStateMachineSample WHERE \`label.aws:cloudformation:logical-id\` = 'PublishWorkflow'`,
          columnStart: 1,
          columnEnd: 3,
          chartSize: 'medium',
          chartType: 'billboard',
          title: 'Publishes Succeeded',
          useSince: true,
        },
        {
          nrql: `SELECT sum(provider.executionsStarted.Sum) as 'Succeeded' FROM AwsStatesStateMachineSample WHERE \`label.aws:cloudformation:logical-id\` = 'PublishWorkflow'`,
          columnStart: 4,
          columnEnd: 12,
          chartSize: 'medium',
          chartType: 'line',
          title: 'Publishes Succeeded',
          useSince: true,
        },
      ],
    },
    {
      id: 'Pub-Fail-Detail',
      config: [
        {
          nrql: `SELECT sum(provider.executionsFailed.Sum) as 'result' FROM AwsStatesStateMachineSample WHERE \`label.aws:cloudformation:logical-id\` = 'PublishWorkflow'`,
          columnStart: 1,
          columnEnd: 3,
          chartSize: 'small',
          chartType: 'billboard',
          title: 'Publishes Failed',
          useSince: true,
        },
        {
          nrql: `SELECT sum(provider.executionsFailed.Sum) as 'result' FROM AwsStatesStateMachineSample WHERE \`label.aws:cloudformation:logical-id\` = 'PublishWorkflow'`,
          columnStart: 4,
          columnEnd: 12,
          chartSize: 'small',
          chartType: 'line',
          title: 'Publishes Failed',
          useSince: true,
        },
      ],
    },
    {
      id: 'Pub-Time-Detail',
      config: [
        {
          nrql: `SELECT average(provider.executionTime.Average/1000) as 'Publish Time (s)' FROM AwsStatesStateMachineSample WHERE \`label.aws:cloudformation:logical-id\` ='PublishWorkflow'`,
          columnStart: 1,
          columnEnd: 3,
          chartSize: 'medium',
          chartType: 'billboard',
          title: 'Publish Time (s)',
          useSince: true,
        },
        {
          nrql: `SELECT average(provider.executionTime.Average/1000) as 'Publish Time (s)' FROM AwsStatesStateMachineSample WHERE \`label.aws:cloudformation:logical-id\` ='PublishWorkflow'`,
          columnStart: 4,
          columnEnd: 12,
          chartSize: 'medium',
          chartType: 'line',
          title: 'Publishes Time (s)',
          useSince: true,
        },
      ],
    },
    {
      id: 'Pub-Fail-Ratio-Detail',
      config: [
        {
          nrql: `FROM AwsStatesStateMachineSample SELECT sum(provider.executionsFailed.Sum) / sum(provider.executionsStarted.Sum) * 100 as 'Publish Failure Ratio' WHERE \`label.aws:cloudformation:logical-id\` = 'PublishWorkflow'`,
          columnStart: 1,
          columnEnd: 3,
          chartSize: 'medium',
          chartType: 'billboard',
          title: 'Publish Failure Ratio (%)',
          useSince: true,
        },
        {
          nrql: `FROM AwsStatesStateMachineSample SELECT sum(provider.executionsFailed.Sum) / sum(provider.executionsStarted.Sum) * 100 as 'Publish Failure Ratio' WHERE \`label.aws:cloudformation:logical-id\` = 'PublishWorkflow'`,
          columnStart: 4,
          columnEnd: 12,
          chartSize: 'medium',
          chartType: 'line',
          title: 'Publish Failure Ratio (%)',
          useSince: true,
        },
      ],
    },
  ],
}