import { defineOperationApp } from '@directus/extensions-sdk';

export default defineOperationApp({
	id: 'operation-template-brevo',
	name: 'Brevo Template Email',
	icon: 'mail',
	description: 'This operation allows you to send template mails through Brevo API',
	overview: ({ to, template_id}) => [ //retriving data for the preview
		{
			label: 'To',
			text: to,
		},
        {
			label: 'Template id',
			text: template_id,
		},
	],
	options: [
        {
            field: 'brevo_api_key',
            name: 'Brevo API key',
            type: 'string',
            meta: {
                width: 'hald',
                interface: 'input',
            },
        },
        {
            field: 'template_id',
            name: 'Brevo Template ID',
            type: 'integer',
            meta: {
                width: 'half',
                interface: 'input',
            },
        },
        {
            field: 'to',
            name: 'To address',
            type: 'string',
            meta: {
                width: 'full',
                interface: 'input',
            },
        },
        {
            field: 'template_data',
            name: 'Dynamic Template Data',
            type: 'json',
            meta: {
                width: 'full',
                interface: 'list',
                options: {
                    template: '{{key}}: {{var}}',
                    fields: [
                        {
                            field: 'key',
                            name: 'Variable Name',
                            type: 'string',
                            meta: {
                                width: 'half',
                                interface: 'input',
                                options: {
                                    font: 'monospace',
                                },
                            },
                        },
                        {
                                field: 'var',
                                name: 'Variable Value',
                                type: 'string',
                                meta: {
                                    width: 'half',
                                    interface: 'input',
                                    options: {
                                        font: 'monospace',
                                    },
                                },
                        },
                    ],
                },
            },
        },
	],
});