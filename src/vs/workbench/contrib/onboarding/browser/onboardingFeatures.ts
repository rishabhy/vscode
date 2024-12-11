/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { localize } from 'vs/nls';

export interface IOnboardingFeature {
	readonly id: string;
	readonly title: string;
	readonly description: string;
	readonly command: string;
}

export const ONBOARDING_FEATURES: IOnboardingFeature[] = [
	{
		id: 'command-palette',
		title: localize('onboarding.commandPalette.title', "Command Palette"),
		description: localize('onboarding.commandPalette.description', "Quick access to all VS Code's features (Press {0} to try it)", '$(keyboard) Ctrl/Cmd+Shift+P'),
		command: 'workbench.action.showCommands'
	},
	{
		id: 'intellisense',
		title: localize('onboarding.intellisense.title', "IntelliSense"),
		description: localize('onboarding.intellisense.description', "Smart code completions with IntelliSense (Press {0} to trigger)", '$(keyboard) Ctrl/Cmd+Space'),
		command: 'editor.action.triggerSuggest'
	},
	{
		id: 'integrated-terminal',
		title: localize('onboarding.terminal.title', "Integrated Terminal"),
		description: localize('onboarding.terminal.description', "Built-in terminal for your development workflow (Press {0} to toggle)", '$(keyboard) Ctrl/Cmd+`'),
		command: 'workbench.action.terminal.toggleTerminal'
	},
	{
		id: 'source-control',
		title: localize('onboarding.scm.title', "Source Control"),
		description: localize('onboarding.scm.description', "Built-in Git support for easy version control (Press {0} to open)", '$(keyboard) Ctrl/Cmd+Shift+G'),
		command: 'workbench.view.scm'
	},
	{
		id: 'extensions',
		title: localize('onboarding.extensions.title', "Extensions"),
		description: localize('onboarding.extensions.description', "Extend VS Code with thousands of extensions from the marketplace"),
		command: 'workbench.view.extensions'
	},
	{
		id: 'settings',
		title: localize('onboarding.settings.title', "Settings"),
		description: localize('onboarding.settings.description', "Customize VS Code to your preferences (Press {0} to open)", '$(keyboard) Ctrl/Cmd+,'),
		command: 'workbench.action.openSettings'
	},
	{
		id: 'multi-cursor',
		title: localize('onboarding.multiCursor.title', "Multi-Cursor Editing"),
		description: localize('onboarding.multiCursor.description', "Add multiple cursors to edit in parallel (Press {0} to add cursors)", '$(keyboard) Alt+Click'),
		command: 'editor.action.addCursorDown'
	},
	{
		id: 'debugging',
		title: localize('onboarding.debug.title', "Debugging"),
		description: localize('onboarding.debug.description', "Built-in debugging support for many languages (Press {0} to start)", '$(keyboard) F5'),
		command: 'workbench.action.debug.start'
	}
];
