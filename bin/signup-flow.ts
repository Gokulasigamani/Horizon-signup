import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import { SignupFlowStack } from '../lib/signup-flow-stack';

const app = new cdk.App();
new SignupFlowStack(app, 'SignupFlowStack');