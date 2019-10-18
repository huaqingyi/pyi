#!/usr/bin/env node
import 'reflect-metadata';

import { GYI } from './core';
GYI.runtime();

export * from './core';
export * from './decorators';
export * from './libs';

