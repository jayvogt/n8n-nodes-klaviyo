import { INodeProperties } from 'n8n-workflow';

// When the resource `template` is selected, this `operation` parameter will be shown.
export const TemplateDescriptionOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['template'],
			},
		},
		options: [
			{
				name: 'Get All',
				value: 'get_all',
				action: 'Get all',
				routing: {
					request: {
						method: 'GET',
						url: '/templates',
					},
				},
			},
			{
				name: 'Get One',
				value: 'get_one',
				action: 'Get one',
				routing: {
					request: {
						method: 'GET',
						url: '/template',
					},
				},
			},
			{
				name: 'Template Render',
				value: 'post_render',
				action: 'Template render',
				routing: {
					request: {
						method: 'POST',
						url: '/template-render',
					},
				},
			},
		],
		default: 'get_all',
	},
];

const postRenderOperation: INodeProperties[] = [
	{
		displayName: 'Variables',
		name: 'variables',
		type: 'fixedCollection',
		typeOptions: {
			multipleValues: true,
		},
		displayOptions: {
			show: {
				resource: ['template'],
				operation: ['post_render'],
			},
		},
		options: [
			{
				name: 'variable',
				displayName: 'Variable',
				values: [
					{
						displayName: 'Name',
						name: 'name',
						type: 'string',
						default: 'Name of the variable key to add.',
					},
					{
						displayName: 'Value',
						name: 'value',
						type: 'string',
						default: '',
						description: 'Value to set for the variable key',
					},
				],
			},
		],
		default: [], // Initially selected options
	},
];

const getOperation: INodeProperties[] = [
	{
		displayName: 'Template ID',
		name: 'templateId',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['template'],
				operation: ['get_one', 'post_render'],
			},
		},
		default: '',
	},
	{
		displayName: 'Fields',
		name: 'fields',
		type: 'multiOptions',
		options: [
			{
				name: 'Amp',
				value: 'amp',
			},
			{
				name: 'Company ID',
				value: 'company_id',
			},
			{
				name: 'Created',
				value: 'created',
			},
			{
				name: 'Editor Type',
				value: 'editor_type',
			},
			{
				name: 'HTML',
				value: 'html',
			},
			{
				name: 'Name',
				value: 'name',
			},
			{
				name: 'Text',
				value: 'text',
			},
			{
				name: 'Updated',
				value: 'updated',
			},
		],
		default: [],
		displayOptions: {
			show: {
				resource: ['template'],
				operation: ['get_one'],
			},
		},
	},
];

export const TemplateFields: INodeProperties[] = [...postRenderOperation, ...getOperation];
