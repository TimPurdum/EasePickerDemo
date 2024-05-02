namespace EasePickerDemo.Client;

public record PickerConfig(
        ElementReference Element,
        string[] Css,
        int FirstDay = 1,
        string Lang = "en-US",
        DateTime? Date = null,
        int Grid = 1,
        int Calendars = 1,
        bool ReadOnly = false,
        bool AutoApply = false,
        int? ZIndex = null,
        bool Inline = false,
        bool Header = false
    )
{
    [JsonPropertyName("AmpPlugin")]
    public AmpPluginOptions? AmpPlugin { get; set; }

    [JsonPropertyName("RangePlugin")]
    public RangePluginOptions? RangePlugin { get; set; }

    public string[] Plugins { get; set; } = [];
}
