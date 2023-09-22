package org.springboard.tsc.controller;

import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.xssf.usermodel.XSSFRow;
import org.apache.poi.xssf.usermodel.XSSFSheet;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springboard.tsc.VO.OrganizationServiceVO;
import org.springboard.tsc.VO.OrganizationVO;
import org.springboard.tsc.entity.Organization;
import org.springboard.tsc.service.OrganizationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.*;

@RestController
public class OrganizationController {

    @Autowired
    private OrganizationService organizationService;

    @PostMapping("/organization/add")
    public boolean createUser(@RequestBody OrganizationVO organization) {
        List<Organization> orgList = organizationService.getByName(organization.getName());
        if (orgList != null && orgList.size() > 0) {
            return false;
        }
        organizationService.add(organization);
        return true;
    }

    @GetMapping("/organization")
    public List<OrganizationVO> organization(@RequestParam(required = false) String name) {
        return organizationService.getOrganizations(name);
    }

    @GetMapping("/organization/{id}")
    public OrganizationVO organizationById(@PathVariable long id) {
        return organizationService.getOrganization(id);
    }

    @GetMapping("/organization/export")
    public void organizationExcel(HttpServletResponse response, @RequestParam(required = false) String name) throws IOException {
        Workbook workbook = new XSSFWorkbook();
        XSSFSheet sheet = (XSSFSheet) workbook.createSheet("organization data");
        List<OrganizationVO> data = organizationService.getOrganizations(name);
        if (data != null && data.size() > 0) {
            int rownum = 0;
            for (OrganizationVO org : data) {
                Row row = sheet.createRow(rownum++);
                Cell cell0 = row.createCell(0);
                cell0.setCellValue(String.valueOf(org.getId()));
                Cell cell1 = row.createCell(1);
                cell1.setCellValue(org.getName());
                Cell cell2 = row.createCell(2);
                cell2.setCellValue(org.getPhone());
                Cell cell3 = row.createCell(3);
                cell3.setCellValue(org.getLocation());
                Cell cell4 = row.createCell(4);
                cell4.setCellValue(org.getEmail());
                Cell cell5 = row.createCell(5);
                cell5.setCellValue(org.getServices().toString());
            }
        }
        String headerKey = "Content-Disposition";
        String headerValue = "attachment; filename=organization_" + new Date() + ".xlsx";
        response.setHeader(headerKey, headerValue);
        ServletOutputStream outputStream = response.getOutputStream();
        workbook.write(outputStream);
        workbook.close();
        outputStream.close();
    }

    @PostMapping(value = "/organization/import",produces = MediaType.APPLICATION_JSON_VALUE)
    public Map<String, Boolean> importOrganization(@RequestParam("file") MultipartFile orgFile) {
        Map<String,Boolean> result = new HashMap<>();
        try (XSSFWorkbook workbook = new XSSFWorkbook(orgFile.getInputStream())) {
            XSSFSheet worksheet = workbook.getSheetAt(0);
            for (int i = 1; i < worksheet.getPhysicalNumberOfRows(); i++) {
                OrganizationVO organization = new OrganizationVO();
                XSSFRow row = worksheet.getRow(i);
                organization.setName(row.getCell(0).getStringCellValue());
                organization.setEmail(row.getCell(1).getStringCellValue());
                organization.setPhone(String.valueOf(row.getCell(2).getNumericCellValue()));
                organization.setLocation(row.getCell(3).getStringCellValue());
                organization.setPassword("test1234");
                OrganizationServiceVO orgServiceVo = new OrganizationServiceVO();
                orgServiceVo.setName(row.getCell(4).getStringCellValue());
                orgServiceVo.setWorkerName(row.getCell(5).getStringCellValue());
                orgServiceVo.setEmail(row.getCell(6).getStringCellValue());
                orgServiceVo.setServiceCategory(row.getCell(7).getStringCellValue());
                orgServiceVo.setPassword("test1234");
                orgServiceVo.setZoom(String.valueOf(row.getCell(8).getNumericCellValue()));
                orgServiceVo.setDescription(row.getCell(9).getStringCellValue());
                ArrayList<OrganizationServiceVO> orgServiceList = new ArrayList<>();
                orgServiceList.add(orgServiceVo);
                organization.setServices(orgServiceList);
                List<Organization> orgList = organizationService.getByName(organization.getName());
                if (orgList == null || orgList.size() == 0) {
                    organizationService.add(organization);
                }
            }
            result.put("Result",Boolean.TRUE);
        } catch (Exception e) {
            e.printStackTrace();
            result.put("Result",Boolean.FALSE);
        }
        return result;
    }

    @GetMapping("/organization/add/test")
    public void add() {
        OrganizationVO organization = new OrganizationVO();
        organization.setName("Test Organization");
        organization.setEmail("test@test.com");
        organization.setPassword("test1234");

        List<OrganizationServiceVO> orgServiceList = new ArrayList<>();
        OrganizationServiceVO vo = new OrganizationServiceVO();
        vo.setWorkerName("Worker A");
        vo.setZoom("123456");
        vo.setEmail("testA@test.com");
        vo.setPassword("test1234");
        vo.setDescription("description");
        vo.setName("Health care A service");
        orgServiceList.add(vo);

        OrganizationServiceVO vo1 = new OrganizationServiceVO();
        vo1.setWorkerName("Worker B");
        vo1.setZoom("123456");
        vo1.setEmail("testB@test.com");
        vo1.setPassword("test1234");
        vo1.setDescription("description");
        vo1.setName("Health care B service");
        orgServiceList.add(vo1);

        organization.setServices(orgServiceList);
        organizationService.add(organization);
    }
}
