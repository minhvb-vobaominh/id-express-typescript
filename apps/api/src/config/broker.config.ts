import { BrokerOptions, Errors, ServiceBroker } from 'moleculer';

const brokerConfig: BrokerOptions = {
  nodeID: 'node-1',
  transporter: {
    type: 'NATS',
    options: {
      url: 'nats://103.77.215.101:4222',
      user: 'ruser',
      pass: 'T0pS3cr3t',
    },
  },
  logger: true,
  logLevel: 'info',
  cacher: 'Memory',
  serializer: 'JSON',
  requestTimeout: 5 * 1000,
  retryPolicy: {
    enabled: true,
    retries: 5,
    delay: 100,
    maxDelay: 1000,
    factor: 2,
    // check: (err: Errors.MoleculerRetryableError) => err && !!err.retryable,
  },
  circuitBreaker: {
    enabled: true,
    threshold: 0.5,
    windowTime: 60,
    minRequestCount: 20,
    halfOpenTime: 10 * 1000,
    // check: (err: Errors.MoleculerError) => err && err.code >= 500,
  },
  bulkhead: {
    enabled: true,
    concurrency: 10,
    maxQueueSize: 100,
  },
  validator: true,
  metrics: true,
  tracing: true,
};

export const broker = new ServiceBroker(brokerConfig);
