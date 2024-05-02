import { easepick } from '@easepick/bundle';
import { IPickerConfig } from '@easepick/core/dist/types';

export async function createPicker(options: IPickerConfig, endDateDiv: any | null,
    dotNetRef: any) {

    const picker = new easepick.create(options);
                    
    return picker;
}          