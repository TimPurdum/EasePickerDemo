import { easepick, RangePlugin, AmpPlugin } from '@easepick/bundle';
import { IPickerConfig } from '@easepick/core/dist/types';

export async function createPicker(options: IPickerConfig, endDateDiv: any | null,
    dotNetRef: any) {
    let isRangeEnabled = false;
    if (options.plugins.length > 0) {
        // replace string representation of plugin with actual plugin
        options.plugins = options.plugins.map((plugin) => {
            switch (plugin) {
                case 'RangePlugin':
                    isRangeEnabled = true;
                    if (endDateDiv) {
                        options.RangePlugin.elementEnd = endDateDiv;
                    }
                    return RangePlugin;
                case 'AmpPlugin':
                    if ((options.AmpPlugin.dropdown as any).yearsAscending) {
                        options.AmpPlugin.dropdown.years = 'asc';
                    }
                    return AmpPlugin;
            }
        });
    }

    const picker = new easepick.create(options);
                        
    picker.on('select', async (e) => {
        if (isRangeEnabled) {
            await dotNetRef.invokeMethodAsync('OnDateRangeSelected', e.detail.start, e.detail.end);
        } else {
            await dotNetRef.invokeMethodAsync('OnDateSelected', e.detail.date);
        }
    });
                    
    return picker;
}          