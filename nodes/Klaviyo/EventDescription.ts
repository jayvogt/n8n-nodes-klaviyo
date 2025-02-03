import { INodeProperties } from 'n8n-workflow';

// When the resource `template` is selected, this `operation` parameter will be shown.
export const EventDescriptionOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['event'],
			},
		},
		options: [
			{
				name: 'Get All',
				value: 'get_all',
				action: 'Get all events',
				routing: {
					request: {
						method: 'GET',
						url: '/events'
					}
				}
			},
			{
				name: 'Create Event',
				value: 'post_create',
				action: 'Create',
				routing: {
					request: {
						method: 'POST',
						url: '/events',
					},
				},
			},
		],
		default: 'get_all',
	},
];

const postCreateOperation: INodeProperties[] = [
	{
		displayName: 'Metric Name',
		name: 'metricName',
		type: 'string',
		default: 'Viewed Product',
		description: 'Name of the event. Must be less than 128 characters.',
		required: true,
		displayOptions: {
			show: {
				resource: ['event'],
				operation: ['post_create'],
			},
		},
	},
	{
		displayName: 'Properties',
		name: 'properties',
		type: 'fixedCollection',
		typeOptions: {
			multipleValues: false,
		},
		displayOptions: {
			show: {
				resource: ['event'],
				operation: ['post_create'],
			},
		},
		options: [
			{
				displayName: 'Metric Service',
				name: 'metricService',
				values: [
					{
						displayName: 'Metric Service',
						name: 'metricService',
						type: 'string',
						default: '',
						description:
							'This is for advanced usage. For api requests, this should use the default, which is set to api. (If you are unsure, leave this blank.)',
					},
				],
			},
			{
				displayName: 'Time',
				name: 'time',
				values: [
					{
						displayName: 'Time',
						name: 'time',
						type: 'dateTime',
						default: '2022-11-08T00:00:00',
						description:
							'When this event occurred. By default, the time the request was received will be used.\nThe time is truncated to the second.\nThe time must be after the year 2000 and can only be up to 1 year in the future.',
					},
				],
			},
			{
				displayName: 'Value',
				name: 'value',
				values: [
					{
						displayName: 'Value',
						name: 'value',
						type: 'number',
						default: 9.99,
						description:
							'A numeric value to associate with this event. For example, the dollar amount of a purchase.',
					},
				],
			},
			{
				displayName: 'Unique ID',
				name: 'uniqueId',
				values: [
					{
						displayName: 'Unique ID',
						name: 'uniqueId',
						type: 'string',
						default: '',
						description:
							'A unique identifier for an event.\nIf the unique_id is repeated for the same profile and metric, only the first processed event will be recorded.\nIf this is not present, this will use the time to the second. Using the default, this limits only one event per profile per second.',
					},
				],
			},
		],
		default: [], // Initially selected options
	},
	{
		displayName: 'Profile',
		name: 'profile',
		type: 'fixedCollection',
		required: true,
		typeOptions: {
			multipleValues: true,
			minValue: 1,
		},
		displayOptions: {
			show: {
				resource: ['event'],
				operation: ['post_create'],
			},
		},
		options: [
			{
				name: 'profile',
				displayName: 'Profile',
				values: [
					{
						displayName: 'Key',
						name: 'key',
						type: 'string',
						default: 'newKey',
						description:
							"$email and/or $phone_number can be used as the identify the profile\nOther key value pairs can be used to create segments. For example, to create a list of people on trial plans, include a profile's plan type in the profile. The profile supports fields. The fields include: $email (string), $first_name (string), $last_name (string), $phone_number (string), $city (string), $region (string; state or other region), $country (string), $zip (string), $image (string; URL to a photo of a person), and $consent (list of strings; eg: ['sms', 'email', 'web', 'directmail','mobile'])",
					},
					{
						displayName: 'Value',
						name: 'value',
						type: 'string',
						default: 'value',
						description: 'Value to set for the variable key',
					},
				],
			},
		],
		default: [], // Initially selected options
	},
	{
		displayName: 'Attributes',
		name: 'attributes',
		type: 'fixedCollection',
		typeOptions: {
			multipleValues: true,
		},
		displayOptions: {
			show: {
				resource: ['event'],
				operation: ['post_create'],
			},
		},
		options: [
			{
				name: 'attribute',
				displayName: 'Attribute',
				description:
					'Properties of this event. Any top level property (that are not objects) can be used to create segments. The $extra property is a special property. This records any non-segmentable values that can be references later. For example, HTML templates are useful on a segment, but itself is not used in creating a segment. There are limits placed onto the size of the data present. This must not exceed 5 MB. This must not exceed 300 event properties. A single string cannot be larger than 100 KB. Each array must not exceed 4000 elements. The properties cannot contain more than 10 nested levels.',
				values: [
					{
						displayName: 'Key',
						name: 'key',
						type: 'string',
						default: 'newKey',
					},
					{
						displayName: 'Value',
						name: 'value',
						type: 'string',
						default: 'value',
					},
				],
			},
		],
		default: [], // Initially selected options
	},
];

export const EventFields: INodeProperties[] = [...postCreateOperation];
