import * as _ from "lodash";
import { Button, InputNumber, Popover } from "element-ui";
import * as L from "leaflet";
import { Map, TileLayer } from "leaflet";
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import { RestResultDTO } from "@ytd/fe-core";
import { CreateElement } from "vue";

/**
 * 经纬坐标选取
 */
@Component<HyCoordinatePicker>({})
export class HyCoordinatePicker extends Vue {
  /** 纬度 */
  @Prop({
    type: [Number, String]
  })
  lat: number | string;

  /** 经度 */
  @Prop({
    type: [Number, String]
  })
  lng: number | string;

  /** 元素ID */
  id: string = _.uniqueId("hy-coordinate-picker-map-");
  localLat: number = Number(this.lat);
  localLng: number = Number(this.lng);
  map: Map;
  backgroundTitleLayer: TileLayer = new L.TileLayer(
    "http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
    {}
  );

  get computedLat() {
    return this.localLat;
  }

  set computedLat(_localLat) {
    this.localLat = _localLat;
    this.$emit("update:lat", _localLat);
  }

  get computedLng() {
    return this.localLng;
  }

  set computedLng(_localLng) {
    this.localLng = _localLng;
    this.$emit("update:lng", _localLng);
  }

  @Watch("lat")
  onLatChanged(newLat: number | string) {
    this.localLat = Number(newLat);
  }

  @Watch("lng")
  onLngChanged(newLng: number | string) {
    this.localLng = Number(newLng);
  }

  handlePopoverShow() {
    const vm = this;

    setTimeout(() => {
      new Promise((resolve, reject) => {
        $.ajax({
          url: `${window.location.origin}/api/gis/1.0/layers/background`
        })
          .done((result: RestResultDTO<any>) => {
            if (result.success && result.data && result.data.length) {
              const layer = _.find(result.data, i => i.tag == "google");
              if (layer) {
                vm.backgroundTitleLayer = new L.TileLayer(
                  `${layer.key}/{z}/{x}/{y}.png`,
                  {}
                );
                resolve();
              } else {
                resolve();
              }
            } else {
              resolve();
            }
          })
          .fail(() => {
            resolve();
          });
      }).then(() => {
        /* 调整 popover 的 z-index */
        const dialogIndex = $(`#${vm.id}-container`)
          .closest(".el-dialog__wrapper")
          .css("z-index");
        if (dialogIndex) {
          $(`#${vm.id}`)
            .closest(".hy-coordinate-picker__map")
            .css("z-index", parseInt(dialogIndex, 10) + 1);
        }

        vm.map = new L.Map(vm.id, {
          center: [vm.computedLat, vm.computedLng],
          zoom: 13,
          attributionControl: false,
          zoomControl: true,
          contextmenu: false,
          doubleClickZoom: false
        } as L.MapOptions);

        /* 坐标超出范围（中国），则定位到全局配置的坐标中心 */
        if (
          vm.computedLat < 3 ||
          vm.computedLat > 54 ||
          (vm.computedLng < 73 || vm.computedLng > 136)
        ) {
          $.ajax({
            url: `${
              window.location.origin
            }/api/pdnms/1.0/globalConfigs/query/coordinates`
          }).done(
            (
              result: RestResultDTO<{ latitude: number; longitude: number }>
            ) => {
              if (
                result.success &&
                result.data &&
                result.data.latitude &&
                result.data.longitude
              ) {
                vm.map.panTo(
                  new L.LatLng(result.data.latitude, result.data.longitude)
                );
              }
            }
          );
        }

        vm.backgroundTitleLayer.addTo(vm.map);

        /* 标识当前坐标 */
        const currentLocationMarker = new L.Marker(
          [vm.computedLat, vm.computedLng],
          {
            icon: new L.DivIcon({
              className: "current-location-marker",
              iconAnchor: new L.Point(0, 0),
              html: `<div class="marker-icon">
                       <div style="width: 50%; height: 0; top:9px; left: -10px; border-top:  2px solid #FF4949;"></div>
                       <div style="width: 50%; height: 0; top:9px; left: 15px; border-top:  2px solid #FF4949;"></div>
                       <div style="width: 0; height: 50%; top: 15px; left: 9px; border-left: 2px solid #FF4949;"></div>
                       <div style="width: 0; height: 50%; top: -10px; left: 9px; border-left: 2px solid #FF4949;"></div>
                     </div>`
            })
          }
        ).addTo(vm.map);

        /* 添加控件：定位并居中到当前坐标 */
        const controlLocate = new L.Control({ position: "topleft" });
        controlLocate.onAdd = map => {
          const btn_holder = L.DomUtil.create("div", "leaflet-bar");
          const btn = L.DomUtil.create("a", "leaflet-control-locate");
          btn.innerHTML = '<i class="fa fa-dot-circle-o"></i>';
          btn_holder.appendChild(btn);
          L.DomEvent.on(
            btn,
            "click",
            ((e: Event) => {
              e.stopPropagation();
              vm.map.panTo(new L.LatLng(vm.computedLat, vm.computedLng));
              currentLocationMarker.setLatLng(
                new L.LatLng(vm.computedLat, vm.computedLng)
              );
            }).bind(vm)
          );
          return btn_holder;
        };
        controlLocate.addTo(vm.map);

        /* 点击地图，更新坐标 */
        vm.map.on(
          "click",
          ((event: L.LeafletEvent) => {
            const e = event as L.LocationEvent;
            if (e.latlng) {
              vm.computedLat = Math.floor(e.latlng.lat * 1000000) / 1000000;
              vm.computedLng = Math.floor(e.latlng.lng * 1000000) / 1000000;
              vm.map.panTo(new L.LatLng(vm.computedLat, vm.computedLng));
              currentLocationMarker.setLatLng(
                new L.LatLng(vm.computedLat, vm.computedLng)
              );
            }
          }).bind(vm)
        );
      });
    }, 0);
  }

  handlePopoverHide() {
    if (this.map) {
      this.map.remove();
    }
  }

  // tslint:disable-next-line:member-ordering
  public render(h: CreateElement) {
    const vm = this;

    return (
      <section class="hy-coordinate-picker" id={`${vm.id}-container`}>
        <InputNumber
          placeholder="经度"
          vModel={vm.computedLng}
          min={0}
          max={136}
          class="hy-coordinate-picker__lng"
          style={{ width: "160px" }}
        />
        <InputNumber
          placeholder="纬度"
          vModel={vm.computedLat}
          min={0}
          max={54}
          class="hy-coordinate-picker__lat"
          style={{ width: "160px" }}
        />
        <Popover
          visibleArrow={false}
          placement="bottom-end"
          width={350}
          trigger="click"
          popperClass="hy-coordinate-picker__map"
          onShow={vm.handlePopoverShow}
          onHide={vm.handlePopoverHide}
        >
          <Button slot="reference" class="hy-coordinate-picker__button">
            <i class="fa fa-dot-circle-o" />
          </Button>
          <section id={vm.id} class="hy-coordinate-picker__map__container" />
        </Popover>
      </section>
    );
  }
}
