import {
	INodeType,
	INodeTypeDescription
} from 'n8n-workflow';
import { CustomMetricOperations, CustomMetricFields } from './CustomMetric';
import { EventOperations, EventFields } from './Event';
import { MetricOperations, MetricFields } from './Metric';
import { ProfileOperations, ProfileFields } from './Profile';
import { TemplateOperations, TemplateFields } from './Template';

export class Klaviyo implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Klaviyo',
		name: 'klaviyo',
		icon: 'file:klaviyo.svg',
		group: ['transform'],
		version: 1,
		subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
		description: 'Interact with the Klaviyo API',
		defaults: {
			name: 'Klaviyo',
		},
		inputs: ['main'],
		outputs: ['main'],
		credentials: [
			{
				name: 'klaviyoApi',
				required: true,
			},
		],
		requestDefaults: {
			baseURL: 'https://a.klaviyo.com/api',
			headers: {
				Accept: 'application/vnd.api+json',
				'Content-Type': 'application/vnd.api+json',
			},
		},
		properties: [
			{
				displayName: 'Resource',
				name: 'resource',
				type: 'options',
				noDataExpression: true,
				options: [
					{
						name: 'Custom Metric',
						value: 'customMetric'
					},
					{
						name: 'Event',
						value: 'event',
					},
					{
						name: 'Metric',
						value: 'metric',
					},
					{
						name: 'Profile',
						value: 'profile',
					},
					{
						name: 'Template',
						value: 'template',
					}
				],
				default: 'event',
			},
			...CustomMetricOperations,
			...CustomMetricFields,
			...EventOperations,
			...EventFields,
			...MetricOperations,
			...MetricFields,
			...ProfileOperations,
			...ProfileFields,
			...TemplateOperations,
			...TemplateFields
		],
	};
}